const DEFAULT_NOTES = [
    '포즈 추정 기반 2D 관절각은 카메라 각도와 랜드마크 오차의 영향을 받습니다.',
    '바벨 궤적, 정확한 토크, 파워, 지면반력은 직접 측정되지 않았으므로 프록시 해석으로 제한됩니다.',
]

function toNumber(value, fallback = 0) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : fallback
}

function round(value, digits = 2) {
    if (!Number.isFinite(value)) {
        return 0
    }

    const factor = 10 ** digits
    return Math.round(value * factor) / factor
}

function average(values) {
    if (!values.length) {
        return 0
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length
}

function humanizeSlug(slug) {
    return String(slug ?? '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function extractExerciseKey(summary, sourcePath = '') {
    const source = String(summary?.source_file ?? sourcePath ?? '')
    const sourceMatch = source.match(/docs\/([^/]+)\//i)

    if (sourceMatch) {
        return sourceMatch[1]
    }

    const stemMatch = source.match(/([^\\/]+)-summary\.json$/i)

    if (stemMatch) {
        return stemMatch[1]
    }

    return 'exercise'
}

function resolveExerciseName(summary, sourcePath = '') {
    const explicitName = String(
        summary?.exercise_name ?? summary?.exercise ?? summary?.metadata?.exercise ?? '',
    ).trim()

    if (explicitName) {
        return explicitName
    }

    const key = extractExerciseKey(summary, sourcePath)
    return humanizeSlug(key)
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

function summarizeRep(rep) {
    const bottom = rep?.snapshots?.bottom ?? {}
    const start = rep?.snapshots?.descent_start ?? {}
    const end = rep?.snapshots?.ascent_end ?? {}

    const torsoShift = toNumber(end.torso_angle_deg) - toNumber(start.torso_angle_deg)
    const hipShift = toNumber(bottom.hip_angle_deg) - toNumber(start.hip_angle_deg)
    const kneeShift = toNumber(bottom.knee_angle_deg) - toNumber(start.knee_angle_deg)
    const ankleShift = toNumber(bottom.ankle_angle_deg) - toNumber(start.ankle_angle_deg)

    return {
        repIndex: toNumber(rep?.rep_index),
        repDuration: toNumber(rep?.rep_duration_s),
        descentDuration: toNumber(rep?.descent_duration_s),
        ascentDuration: toNumber(rep?.ascent_duration_s),
        pauseDuration: toNumber(rep?.bottom_pause_estimate_s),
        bottomHipAngle: toNumber(bottom.hip_angle_deg),
        bottomKneeAngle: toNumber(bottom.knee_angle_deg),
        bottomAnkleAngle: toNumber(bottom.ankle_angle_deg),
        bottomTorsoAngle: toNumber(bottom.torso_angle_deg),
        torsoShift,
        hipShift,
        kneeShift,
        ankleShift,
    }
}

function assessDepth(repStats) {
    if (!repStats.length) {
        return '반복 데이터가 부족해 깊이를 정밀하게 판단하기 어렵습니다.'
    }

    const kneeAngles = repStats.map((rep) => rep.bottomKneeAngle).filter((value) => value > 0)
    const hipAngles = repStats.map((rep) => rep.bottomHipAngle).filter((value) => value > 0)
    const averageKneeAngle = average(kneeAngles)
    const averageHipAngle = average(hipAngles)

    if (averageKneeAngle <= 55 && averageHipAngle <= 70) {
        return '대체로 충분한 깊이로 보이며, 평행 이하 스쿼트에 가까운 패턴입니다.'
    }

    if (averageKneeAngle <= 70) {
        return '깊이는 확보되지만 바닥 구간에서 고관절과 발목 가동성의 여유를 더 만들면 자세 안정성이 좋아질 수 있습니다.'
    }

    return '깊이가 다소 보수적으로 보이며, 하강 후반의 고관절·무릎 굴곡 확보가 우선 과제입니다.'
}

function assessTorso(repStats) {
    if (!repStats.length) {
        return '반복 데이터가 부족해 몸통 제어 수준을 확정하기 어렵습니다.'
    }

    const torsoAtBottom = average(repStats.map((rep) => rep.bottomTorsoAngle))
    const torsoShift = average(repStats.map((rep) => rep.torsoShift))

    if (torsoAtBottom <= 9 && torsoShift <= 3) {
        return '상체 전경은 비교적 안정적이며, 바닥과 락아웃 사이에서 흉곽 붕괴 징후가 크지 않습니다.'
    }

    if (torsoAtBottom <= 14) {
        return '하강 말기와 상승 초반에 몸통 전경이 조금 늘어나므로 복압 유지와 상배부 긴장 고정이 중요합니다.'
    }

    return '상체 전경 증가가 뚜렷해 고중량 구간에서 가슴이 먼저 무너질 가능성을 관리해야 합니다.'
}

function assessAsymmetry(series = []) {
    const kneeDiff = average(series.map((point) => Math.abs(toNumber(point.left_right_knee_y_diff))))
    const hipDiff = average(series.map((point) => Math.abs(toNumber(point.left_right_hip_y_diff))))
    const maxKneeDiff = Math.max(...series.map((point) => Math.abs(toNumber(point.left_right_knee_y_diff))), 0)

    if (maxKneeDiff < 0.01 && hipDiff < 0.005) {
        return '좌우 비대칭은 크지 않으며, 영상 기준에서는 양측 협응이 비교적 균등합니다.'
    }

    if (maxKneeDiff < 0.02) {
        return `좌우 흔들림은 경미한 편이지만, 무릎 높이 차 평균 ${round(kneeDiff, 4)} 수준의 편차가 반복됩니다.`
    }

    return `좌우 편차가 비교적 뚜렷하며, 특히 무릎 높이 차 최대 ${round(maxKneeDiff, 4)} 수준의 불균형이 관찰됩니다.`
}

function assessStickingRegion(repStats) {
    const slowerAscentCount = repStats.filter((rep) => rep.ascentDuration > rep.descentDuration * 1.2).length

    if (!repStats.length) {
        return '반복 정보가 부족해 스티킹 포인트를 특정하기 어렵습니다.'
    }

    if (slowerAscentCount >= Math.ceil(repStats.length / 2)) {
        return '대부분의 반복에서 바닥 직후 상승 구간이 더 오래 걸려, 하단 1/3 구간이 주된 스티킹 포인트로 보입니다.'
    }

    return '상승 속도 저하가 크지 않아 명확한 스티킹 포인트는 제한적이지만, 바닥 직후 전환 구간은 여전히 가장 민감한 구간입니다.'
}

function assessStrengthFocus(loadKg, repStats) {
    const repCount = repStats.length
    const avgRepDuration = average(repStats.map((rep) => rep.repDuration))

    if (!repCount) {
        return '반복 수 정보가 부족해 스트렝스 관점의 세트 성격을 확정하기 어렵습니다.'
    }

    if (loadKg >= 180 && repCount <= 5) {
        return '현재 세트는 고중량 저반복 특성이 강해 최대근력과 신경계 동원 능력 개발에 적합합니다.'
    }

    if (avgRepDuration >= 3) {
        return '반복 시간은 다소 길지만 아직은 힘 발휘 유지가 핵심이라 스트렝스와 스킬 훈련의 중간 성격에 가깝습니다.'
    }

    return '강도 해석을 위한 1RM 정보는 없지만, 현재 데이터만 보면 기술 유지형 스트렝스 훈련으로 보는 것이 합리적입니다.'
}

function assessHypertrophyFocus(loadKg, repStats) {
    const totalTimeUnderTension = repStats.reduce((sum, rep) => sum + rep.repDuration, 0)

    if (!repStats.length) {
        return '반복 수와 총 긴장 시간이 부족해 근비대 관점의 해석은 제한적입니다.'
    }

    if (repStats.length >= 6 || totalTimeUnderTension >= 30) {
        return '총 긴장 시간이 확보되어 근비대 자극도 일정 수준 기대할 수 있습니다.'
    }

    if (loadKg >= 180) {
        return '근비대 보조 효과는 있겠지만, 현재 구성만으로는 기계적 긴장은 높고 총 볼륨은 부족해 주된 목적은 근비대보다 스트렝스에 가깝습니다.'
    }

    return '반복 수와 총 긴장 시간이 제한적이어서 근비대 목적이라면 세트 수 추가나 중간 반복 구간 보완이 필요합니다.'
}

function buildTimingTable(repStats) {
    if (!repStats.length) {
        return '반복별 타이밍 정보가 충분하지 않습니다.'
    }

    return repStats.map((rep) => (
        `${rep.repIndex}회차는 총 ${round(rep.repDuration, 2)}초가 걸렸고, `
        + `하강 ${round(rep.descentDuration, 2)}초, `
        + `바닥 정지 ${round(rep.pauseDuration, 2)}초, `
        + `상승 ${round(rep.ascentDuration, 2)}초로 진행되었습니다. `
        + `하단 자세는 고관절 ${round(rep.bottomHipAngle, 1)}도, `
        + `무릎 ${round(rep.bottomKneeAngle, 1)}도, `
        + `몸통 ${round(rep.bottomTorsoAngle, 1)}도 수준입니다.`
    )).join('\n')
}

function buildRepObservations(repStats) {
    if (!repStats.length) {
        return '반복별 관찰을 작성할 만큼 충분한 세부 반복 정보가 없습니다.'
    }

    return repStats.map((rep) => {
        const balance = rep.ascentDuration > rep.descentDuration ? '상승 난도가 더 높습니다.' : '상승과 하강 속도 차가 크지 않습니다.'
        return [
            `${rep.repIndex}회차`,
            `바닥 기준 고관절은 ${round(rep.bottomHipAngle, 1)}도, 무릎은 ${round(rep.bottomKneeAngle, 1)}도, 발목은 ${round(rep.bottomAnkleAngle, 1)}도입니다.`,
            `하강 중 몸통 전경 변화는 ${round(rep.torsoShift, 1)}도 수준이며, ${balance}`,
            `바닥 정지 시간은 약 ${round(rep.pauseDuration, 2)}초로 추정됩니다.`,
        ].join('\n')
    }).join('\n\n')
}

export function parseExerciseSummaryInput(rawInput, sourcePath = '') {
    const summary = JSON.parse(rawInput)

    if (!Array.isArray(summary?.reps)) {
        throw new Error('`reps` 배열이 없는 summary JSON입니다.')
    }

    return summary
}

export function generateExercisePost(summaryInput, options = {}) {
    const summary = typeof summaryInput === 'string'
        ? parseExerciseSummaryInput(summaryInput, options.sourcePath)
        : summaryInput

    const exerciseName = resolveExerciseName(summary, options.sourcePath)
    const loadKg = toNumber(summary?.external_load_kg)
    const repStats = (summary?.reps ?? []).map(summarizeRep)
    const series = summary?.downsampled_timeseries_10fps ?? []
    const avgRepDuration = average(repStats.map((rep) => rep.repDuration))
    const avgDescentDuration = average(repStats.map((rep) => rep.descentDuration))
    const avgAscentDuration = average(repStats.map((rep) => rep.ascentDuration))
    const avgPauseDuration = average(repStats.map((rep) => rep.pauseDuration))
    const title = `${exerciseName} 분석 리포트${loadKg > 0 ? ` | ${loadKg}kg` : ''}${repStats.length ? ` ${repStats.length}회 수행` : ''}`
    const notes = Array.isArray(summary?.analysis_notes) && summary.analysis_notes.length
        ? summary.analysis_notes
        : DEFAULT_NOTES

    const overviewLine = [
        `${exerciseName} 수행 데이터를 요약한 결과,`,
        repStats.length ? `총 ${repStats.length}회 반복이 검출되었고` : '반복 수는 제한적으로 확인되었고',
        loadKg > 0 ? `외부 부하는 ${loadKg}kg로 기록되었습니다.` : '외부 부하 정보는 제한적으로 제공되었습니다.',
    ].join(' ')

    const content = [
        `개요`,
        overviewLine,
        `이 글은 포즈 추정 기반 summary JSON을 바탕으로 기술 패턴, 역학적 해석 프록시, 개선 포인트를 블로그용 일반 문장으로 재구성한 결과입니다.`,
        '',
        `핵심 요약`,
        `평균 반복 시간은 ${round(avgRepDuration, 2)}초이며, 하강 ${round(avgDescentDuration, 2)}초, 바닥 정지 ${round(avgPauseDuration, 2)}초, 상승 ${round(avgAscentDuration, 2)}초 패턴입니다.`,
        assessDepth(repStats),
        assessTorso(repStats),
        assessAsymmetry(series),
        assessStickingRegion(repStats),
        '',
        `반복별 타이밍`,
        buildTimingTable(repStats),
        '',
        `관절 및 역학 해석`,
        `고관절과 무릎 각도는 바닥 구간에서 가장 크게 닫히며, 이는 하강 후반에 큰 굴곡 모멘트 요구가 집중된다는 뜻입니다. 다만 이 값은 2D 관절각 프록시이므로 정확한 관절 토크로 해석하면 안 됩니다.`,
        `몸통 전경은 바닥과 상승 초반의 힘 전달 효율을 좌우합니다. 바벨 궤적이 직접 추적되지 않았기 때문에, 여기서는 어깨와 몸통 중심 이동을 통해 중족부 상부에서 얼마나 균형을 유지했는지 간접적으로 읽어야 합니다.`,
        `발목 각도의 여유가 제한되면 무릎 전방 이동이 막히고 고관절 후방 이동이 커져 상체 숙임이 증가할 수 있습니다. 반대로 무릎이 먼저 밀리고 몸통이 버티지 못하면 흉곽 붕괴와 힙 슛 패턴이 동반되기 쉽습니다.`,
        '',
        `반복별 관찰`,
        buildRepObservations(repStats),
        '',
        `개선 포인트`,
        `하강 후반에서 복압과 상배부 긴장을 더 일찍 고정해 바닥 직후 몸통 각도 변화를 줄이는 것이 우선입니다.`,
        `바닥 반전 순간에 무릎과 고관절이 동시에 펴지도록 의식해 힙 슛 패턴을 줄여야 합니다.`,
        `발목 가동성과 중족부 압력을 함께 관리하면 깊이 확보와 균형 유지가 더 쉬워집니다.`,
        `좌우 편차가 반복된다면 빈봉 또는 서브맥스 중량에서 하강 템포를 통일해 비대칭 원인을 먼저 줄이는 편이 안전합니다.`,
        '',
        `위험 요인`,
        `상승 초반에 상체 전경이 급격히 커지면 요추 전단 부담과 실패 리스크가 함께 증가할 수 있습니다.`,
        `바닥에서 반동이 과도하면 고관절과 무릎의 수동 조직 스트레스가 커질 수 있습니다.`,
        `좌우 무릎 높이 차가 누적되면 장기적으로는 편측 지배 패턴이 강화될 수 있습니다.`,
        '',
        `스트렝스 트레이닝 관점`,
        assessStrengthFocus(loadKg, repStats),
        `스트렝스 목적이라면 현재와 같은 고중량 세트는 유지하되, 스티킹 포인트 보완을 위해 1~2초 정지 스쿼트, 하단 부분범위 스쿼트, 상배부 등척성 유지 훈련을 보조로 두는 구성이 효율적입니다.`,
        '',
        `근비대 관점`,
        assessHypertrophyFocus(loadKg, repStats),
        `근비대를 더 노린다면 동일 운동에서 반복 수를 늘리기보다, 중간 강도 백오프 세트나 전면 하체 볼륨을 추가해 총 유효 반복 수를 확보하는 접근이 더 적절합니다.`,
        '',
        `해석 한계`,
        ...notes,
    ].join('\n\n')

    return {
        title,
        content,
        metadata: {
            exerciseName,
            loadKg,
            detectedRepCount: repStats.length,
            averageRepDuration: round(avgRepDuration, 2),
        },
    }
}
