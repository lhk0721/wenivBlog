# Back Squat AI Prompt Draft

## System Message
```text
You are a biomechanics analyst specializing in strength training and pose-estimation-based movement analysis. Distinguish direct observations from inferences, state assumptions explicitly before calculations, use SI units, and do not claim exact kinetics without calibration data, anthropometrics, and external measurement tools.
```

## User Message Draft
```md
Analyze the attached back squat pose-estimation dataset.

Context:
- Exercise: back squat
- External load: 260 kg
- Preferred summary file: docs/backSquat/backSquat-summary.json
- Primary pose file: docs/backSquat/backSquat-20260311013416.json
- Metadata summary: docs/backSquat/metadata.md
- Sampling rate: use 100 fps as the primary sampling rate unless the data itself contradicts that

Your tasks:
1. Detect the number of reps in the clip.
2. Segment each rep into setup, descent, bottom, ascent, and lockout.
3. For each rep, estimate:
   - total rep time
   - descent time
   - ascent time
   - bottom pause time
   - hip angle trend
   - knee angle trend
   - ankle angle trend
   - torso inclination trend
   - visible left-right asymmetry
4. Identify the likely sticking region for each rep.
5. Evaluate technique using pose evidence only:
   - depth
   - torso control
   - hip shoot
   - chest collapse
   - knee travel
   - balance over midfoot proxy
   - bar path proxy using shoulder/trunk motion if the bar is not directly tracked
6. Provide simplified biomechanics estimates only when justified by the data.

Calculation rules:
- Separate `Direct observations from pose data` and `Inferences / estimates`.
- State all assumptions before calculating.
- Use simplified sagittal-plane reasoning unless you can justify something better.
- If exact force, torque, power, or bar displacement in meters is not defensible, explain why and provide proxy analysis instead.
- If any part of the dataset is unreliable because of occlusion, confidence drop, camera angle, or landmark jitter, say so explicitly.

Preferred output format:
- Summary
- Rep count
- Rep-by-rep phase timing table
- Joint-angle and torso observations
- Technique findings
- Biomechanics estimates with assumptions
- Limitations
```

## Short Version
```md
Analyze this 260 kg back squat pose-estimation dataset. Use the pose sequence as primary evidence and 100 fps as the primary sampling rate. Detect reps, segment phases, estimate joint-angle and torso trends, identify sticking points, and assess technique. Separate direct observations from inferences, state assumptions before calculations, use SI units, and avoid claiming exact kinetics without calibration or anthropometric data.
```

## If You Send Reduced Data
```md
The full JSON is large. I am sending a reduced subset containing detected reps, key frames, phase timing, and summary kinematics in `docs/backSquat/backSquat-summary.json`. Base conclusions on the provided subset and explicitly mention any limitations caused by data reduction.
```
