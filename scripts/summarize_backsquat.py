import json
from pathlib import Path
from statistics import median


ROOT = Path(__file__).resolve().parents[1]
INPUT_PATH = ROOT / "docs" / "backSquat" / "backSquat-20260311013416.json"
OUTPUT_PATH = ROOT / "docs" / "backSquat" / "backSquat-summary.json"


KEYS = {
    "left_shoulder": 11,
    "right_shoulder": 12,
    "left_hip": 23,
    "right_hip": 24,
    "left_knee": 25,
    "right_knee": 26,
    "left_ankle": 27,
    "right_ankle": 28,
    "left_heel": 29,
    "right_heel": 30,
    "left_foot_index": 31,
    "right_foot_index": 32,
}


def midpoint(a, b):
    return [(a[i] + b[i]) / 2 for i in range(4)]


def angle_deg(a, b, c):
    import math

    bax = a[0] - b[0]
    bay = a[1] - b[1]
    bcx = c[0] - b[0]
    bcy = c[1] - b[1]
    mag_ba = (bax * bax + bay * bay) ** 0.5
    mag_bc = (bcx * bcx + bcy * bcy) ** 0.5
    if mag_ba == 0 or mag_bc == 0:
        return None
    dot = bax * bcx + bay * bcy
    cos_theta = max(-1.0, min(1.0, dot / (mag_ba * mag_bc)))
    return math.degrees(math.acos(cos_theta))


def moving_average(values, window):
    half = window // 2
    out = []
    for i in range(len(values)):
        start = max(0, i - half)
        end = min(len(values), i + half + 1)
        out.append(sum(values[start:end]) / (end - start))
    return out


def format_point(p):
    return {
        "x": round(p[0], 5),
        "y": round(p[1], 5),
        "z": round(p[2], 5),
        "visibility": round(p[3], 4),
    }


def rep_snapshot(series, index):
    return {
        "frame": series[index]["frame"],
        "time_s": round(series[index]["time_s"], 3),
        "mid_hip_y": round(series[index]["mid_hip"]["y"], 5),
        "torso_angle_deg": series[index]["torso_angle_deg"],
        "hip_angle_deg": series[index]["hip_angle_deg"],
        "knee_angle_deg": series[index]["knee_angle_deg"],
        "ankle_angle_deg": series[index]["ankle_angle_deg"],
    }


def main():
    data = json.loads(INPUT_PATH.read_text(encoding="utf-8"))
    frames = data["frames"]["f"]
    fps = data["metadata"]["fps"]

    samples = []
    for frame in frames:
        pts = frame["p"]
        l_sh = pts[KEYS["left_shoulder"]]
        r_sh = pts[KEYS["right_shoulder"]]
        l_hip = pts[KEYS["left_hip"]]
        r_hip = pts[KEYS["right_hip"]]
        l_knee = pts[KEYS["left_knee"]]
        r_knee = pts[KEYS["right_knee"]]
        l_ank = pts[KEYS["left_ankle"]]
        r_ank = pts[KEYS["right_ankle"]]
        l_heel = pts[KEYS["left_heel"]]
        r_heel = pts[KEYS["right_heel"]]
        l_toe = pts[KEYS["left_foot_index"]]
        r_toe = pts[KEYS["right_foot_index"]]

        mid_sh = midpoint(l_sh, r_sh)
        mid_hip = midpoint(l_hip, r_hip)
        mid_knee = midpoint(l_knee, r_knee)
        mid_ank = midpoint(l_ank, r_ank)
        mid_heel = midpoint(l_heel, r_heel)
        mid_toe = midpoint(l_toe, r_toe)

        sample = {
            "frame": frame["i"],
            "time_s": frame["t"],
            "mid_shoulder": format_point(mid_sh),
            "mid_hip": format_point(mid_hip),
            "mid_knee": format_point(mid_knee),
            "mid_ankle": format_point(mid_ank),
            "mid_heel": format_point(mid_heel),
            "mid_toe": format_point(mid_toe),
            "torso_angle_deg": round(angle_deg(mid_sh, mid_hip, [mid_hip[0], mid_hip[1] - 1, 0, 1]), 2),
            "hip_angle_deg": round(angle_deg(mid_sh, mid_hip, mid_knee), 2),
            "knee_angle_deg": round(angle_deg(mid_hip, mid_knee, mid_ank), 2),
            "ankle_angle_deg": round(angle_deg(mid_knee, mid_ank, mid_toe), 2),
            "left_right_knee_y_diff": round(l_knee[1] - r_knee[1], 5),
            "left_right_hip_y_diff": round(l_hip[1] - r_hip[1], 5),
        }
        samples.append(sample)

    hip_y = [s["mid_hip"]["y"] for s in samples]
    smooth = moving_average(hip_y, 15)
    baseline = median(sorted(smooth)[: max(10, len(smooth) // 10)])
    threshold = baseline + 0.06

    rep_candidates = []
    in_rep = False
    start = 0
    for i, value in enumerate(smooth):
        if not in_rep and value > threshold:
            in_rep = True
            start = i
        elif in_rep and value <= threshold:
            end = i
            if end - start >= int(fps * 0.8):
                rep_candidates.append((start, end))
            in_rep = False
    if in_rep:
        end = len(smooth) - 1
        if end - start >= int(fps * 0.8):
            rep_candidates.append((start, end))

    reps = []
    for idx, (start, end) in enumerate(rep_candidates, start=1):
        window = smooth[start:end + 1]
        bottom_local = max(range(len(window)), key=window.__getitem__)
        bottom = start + bottom_local

        bottom_y = smooth[bottom]
        setup_band = baseline + (bottom_y - baseline) * 0.15
        lockout_band = baseline + (bottom_y - baseline) * 0.20

        descent_start = start
        for i in range(start, bottom + 1):
            if smooth[i] > setup_band:
                descent_start = i
                break

        ascent_end = end
        for i in range(bottom, end + 1):
            if smooth[i] <= lockout_band:
                ascent_end = i
                break

        bottom_band = bottom_y - (bottom_y - baseline) * 0.08
        bottom_start = bottom
        for i in range(bottom, descent_start - 1, -1):
            if smooth[i] < bottom_band:
                bottom_start = i + 1
                break

        bottom_end = bottom
        for i in range(bottom, ascent_end + 1):
            if smooth[i] < bottom_band:
                continue
            bottom_end = i - 1 if i > bottom else bottom
            break
        if bottom_end < bottom_start:
            bottom_end = bottom

        reps.append({
            "rep_index": idx,
            "start_frame": samples[start]["frame"],
            "end_frame": samples[end]["frame"],
            "start_time_s": round(samples[start]["time_s"], 3),
            "end_time_s": round(samples[end]["time_s"], 3),
            "descent_start_frame": samples[descent_start]["frame"],
            "bottom_frame": samples[bottom]["frame"],
            "ascent_end_frame": samples[ascent_end]["frame"],
            "descent_start_time_s": round(samples[descent_start]["time_s"], 3),
            "bottom_time_s": round(samples[bottom]["time_s"], 3),
            "ascent_end_time_s": round(samples[ascent_end]["time_s"], 3),
            "rep_duration_s": round(samples[ascent_end]["time_s"] - samples[descent_start]["time_s"], 3),
            "descent_duration_s": round(samples[bottom]["time_s"] - samples[descent_start]["time_s"], 3),
            "ascent_duration_s": round(samples[ascent_end]["time_s"] - samples[bottom]["time_s"], 3),
            "bottom_pause_estimate_s": round(max(0.0, samples[bottom_end]["time_s"] - samples[bottom_start]["time_s"]), 3),
            "snapshots": {
                "descent_start": rep_snapshot(samples, descent_start),
                "bottom": rep_snapshot(samples, bottom),
                "ascent_end": rep_snapshot(samples, ascent_end),
            },
        })

    downsample_step = max(1, int(round(fps / 10)))
    timeseries = []
    for i in range(0, len(samples), downsample_step):
        s = samples[i]
        timeseries.append({
            "frame": s["frame"],
            "time_s": round(s["time_s"], 3),
            "mid_hip_y": round(s["mid_hip"]["y"], 5),
            "mid_shoulder_y": round(s["mid_shoulder"]["y"], 5),
            "torso_angle_deg": s["torso_angle_deg"],
            "hip_angle_deg": s["hip_angle_deg"],
            "knee_angle_deg": s["knee_angle_deg"],
            "ankle_angle_deg": s["ankle_angle_deg"],
            "left_right_knee_y_diff": s["left_right_knee_y_diff"],
            "left_right_hip_y_diff": s["left_right_hip_y_diff"],
        })

    summary = {
        "source_file": str(INPUT_PATH.relative_to(ROOT)).replace("\\", "/"),
        "created_from_metadata_fps": fps,
        "clip_duration_s": data["metadata"]["duration"],
        "frame_count": data["metadata"]["frameCount"],
        "joint_count": len(data["frames"]["j"]),
        "external_load_kg": 260,
        "analysis_notes": [
            "This is a reduced summary intended for AI prompting.",
            "Angles are 2D image-plane approximations based on pose landmarks.",
            "Barbell position is not directly tracked; bar path must be inferred from body proxies.",
            "Force, torque, and power are not exact and require additional calibration and anthropometrics.",
        ],
        "detected_rep_count": len(reps),
        "rep_detection_method": {
            "signal": "smoothed mid-hip y trajectory",
            "window_frames": 15,
            "descent_threshold_y": round(threshold, 5),
            "baseline_y": round(baseline, 5),
        },
        "reps": reps,
        "downsampled_timeseries_10fps": timeseries,
    }

    OUTPUT_PATH.write_text(json.dumps(summary, ensure_ascii=True, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH}")
    print(f"Detected reps: {len(reps)}")


if __name__ == "__main__":
    main()
