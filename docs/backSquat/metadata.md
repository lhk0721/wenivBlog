# Back Squat Analysis Metadata

## Purpose
- This file is a prompt-side metadata document for sending the back squat dataset to an AI model.
- Primary goal: biomechanics calculation and movement analysis for a heavy back squat.
- Declared lift load: `260 kg` back squat.

## Files
- Pose metadata source: `docs/backSquat/metadata.json`
- Pose sequence source: `docs/backSquat/backSquat-20260311013416.json`
- Chat request format reference: `docs/ChatGPT.md`

## Dataset Summary
- Source video: `http://127.0.0.1:5500/poseLandmarker/src/video/backSquat.mp4`
- Clip duration: `10.730646 s`
- Pose schema version: `2`
- Storage format: `compact-single-file`
- Landmark count per frame: `33`
- Landmark fields: `[x, y, z, visibility]`
- Frame fields: `[i, t, p]`
- Main analysis file metadata fps: `100`
- Separate metadata file fps: `60`
- Recommended rule: use `100 fps` from `backSquat-20260311013416.json` as the primary sampling rate for time-series analysis, and treat the `60 fps` value in `metadata.json` as older or secondary metadata unless verified otherwise.

## Landmark Order
- MediaPipe pose landmark order is used.
- Key joints for squat analysis:
  - shoulders: `left_shoulder`, `right_shoulder`
  - hips: `left_hip`, `right_hip`
  - knees: `left_knee`, `right_knee`
  - ankles: `left_ankle`, `right_ankle`
  - heels: `left_heel`, `right_heel`
  - forefoot: `left_foot_index`, `right_foot_index`

## Known Context
- Exercise: high-load back squat
- External load: `260 kg`
- Likely use case:
  - detect reps and phases
  - identify eccentric, bottom, concentric, lockout
  - estimate joint angles and timing
  - infer technical strengths and faults
  - provide coaching feedback
  - perform simplified biomechanics estimates

## What The AI Should Assume
- The `260 kg` refers to the barbell system load being squatted.
- This is a video-based pose-estimation dataset, not a calibrated motion-capture lab dataset.
- Coordinates are image-normalized and mostly 2D with relative depth, not metric world coordinates.
- Any force, torque, power, or velocity estimate is therefore an approximation unless additional anthropometrics and scale calibration are supplied.
- If a value cannot be determined directly from the dataset, the AI should state the assumption explicitly before calculating.

## Required Output Style
- Separate `directly observed from pose data` from `inferred/estimated`.
- Report all assumptions before calculations.
- Use SI units.
- If exact physics is not possible, provide:
  - simplified planar estimate
  - formula
  - variables used
  - confidence/limitation note
- Do not present speculative numbers as measured facts.

## Recommended Analysis Tasks
- Detect number of squat reps.
- Segment each rep into:
  - setup
  - descent
  - bottom
  - ascent
  - lockout
- Estimate for each rep:
  - rep duration
  - descent duration
  - ascent duration
  - bottom pause duration
  - torso angle trend
  - hip angle trend
  - knee angle trend
  - ankle angle trend
  - left-right asymmetry signs
- Identify likely sticking region.
- Comment on:
  - depth
  - bar path proxy from shoulder/torso/hip motion
  - balance over midfoot proxy
  - knee travel
  - hip shoot
  - chest collapse
  - lumbar/pelvic control signs visible from pose

## Biomechanics Calculation Scope
- Allowed:
  - joint angle estimation from landmark geometry
  - angular velocity / angular acceleration estimates
  - COM proxy using mid-hip / trunk proxies
  - bar path proxy using shoulder midpoint if bar is not explicitly tracked
  - relative velocity and acceleration in normalized coordinates
  - simplified sagittal-plane moment discussion
- Not directly measurable without more data:
  - exact joint torques
  - true barbell displacement in meters
  - true force plate variables
  - exact center of pressure
  - exact power in watts

## If Additional Assumptions Are Needed
- Use these defaults unless the user provides better values:
  - body mass: `unknown`
  - body height: `unknown`
  - squat style: `back squat`
  - camera calibration: `unknown`
  - bar position on back: `unknown`
  - stance width: infer qualitatively from ankle/foot landmarks
  - camera view: infer from landmark symmetry and visibility
- If body mass is needed for inverse-dynamics-style approximation, the AI must request it or clearly label the chosen estimate.

## Suggested Prompt Constraints For AI
- Treat the pose sequence as the primary evidence.
- Do not claim exact kinetic outputs unless scale and anthropometrics are available.
- Prefer conservative language such as `suggests`, `likely`, `approximately`, `proxy`.
- Highlight any frame-quality or occlusion issues that weaken conclusions.
- If left/right landmarks disagree substantially, mention possible camera-angle or detection error.

## Suggested Request Template
```md
You are analyzing a back squat biomechanics dataset derived from pose estimation.

Context:
- Exercise: back squat
- External load: 260 kg
- Primary file: docs/backSquat/backSquat-20260311013416.json
- Metadata file: docs/backSquat/metadata.json
- Use 100 fps as the primary sampling rate unless the data suggests otherwise.

Instructions:
- Detect reps and segment phases.
- Estimate joint angles, timing, asymmetry, and likely sticking region.
- Provide simplified biomechanics calculations only when justified.
- Separate direct observations from inferences.
- State all assumptions explicitly.
- Use SI units.
- If exact torque/force/power is not possible, explain why and provide a defensible proxy analysis instead.
```

## Notes For Implementation
- `docs/ChatGPT.md` indicates the request should be sent as a message array with at least one `system` message and the user analysis request.
- When sending to the model, include:
  - a concise system role
  - this metadata summary
  - the relevant JSON data or a reduced processed subset
  - prior conversation turns if continuity is required

## Short System Message Example
```text
You are a biomechanics analyst specializing in strength training and pose-estimation-based movement analysis. Distinguish observed facts from estimates, state assumptions explicitly, and avoid claiming exact kinetics without calibration data.
```

## Quality Warnings
- The dataset appears to contain dense pose frames, which may be too large to send raw in a single prompt.
- Prefer preprocessing into:
  - rep windows
  - key events
  - summarized kinematic series
  - representative frames
- If only one file can be sent, prioritize `backSquat-20260311013416.json`.
