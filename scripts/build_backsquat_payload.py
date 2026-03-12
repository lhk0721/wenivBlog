import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
METADATA_PATH = ROOT / "docs" / "backSquat" / "metadata.md"
SUMMARY_PATH = ROOT / "docs" / "backSquat" / "backSquat-summary.json"
OUTPUT_PATH = ROOT / "docs" / "backSquat" / "chatgpt-request-final.json"


SYSTEM_MESSAGE = (
    "You are a biomechanics analyst specializing in strength training and "
    "pose-estimation-based movement analysis. Distinguish direct observations "
    "from inferences, state assumptions explicitly before calculations, use "
    "SI units, and do not claim exact kinetics without calibration data, "
    "anthropometrics, and external measurement tools."
)


USER_INSTRUCTIONS = """Analyze the attached back squat pose-estimation dataset.

Context:
- Exercise: back squat
- External load: 260 kg
- Preferred reduced file: docs/backSquat/backSquat-summary.json
- Metadata summary: docs/backSquat/metadata.md
- Sampling rate: use 100 fps as the primary sampling rate unless the data itself contradicts that
- The reduced summary was generated from pose landmarks and includes detected reps, key snapshots, and a 10 fps kinematic series

Your tasks:
1. Validate or correct the detected rep count.
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
- Separate Direct observations from pose data and Inferences / estimates.
- State all assumptions before calculating.
- Use simplified sagittal-plane reasoning unless you can justify something better.
- If exact force, torque, power, or bar displacement in meters is not defensible, explain why and provide proxy analysis instead.
- If any part of the dataset is unreliable because of occlusion, confidence drop, camera angle, or landmark jitter, say so explicitly.
- If the reduced summary is insufficient, say what additional raw data is needed.

Preferred output format:
- Summary
- Rep count
- Rep-by-rep phase timing table
- Joint-angle and torso observations
- Technique findings
- Biomechanics estimates with assumptions
- Limitations
"""


def main():
    metadata_text = METADATA_PATH.read_text(encoding="utf-8")
    summary_text = SUMMARY_PATH.read_text(encoding="utf-8")

    user_content = (
        USER_INSTRUCTIONS
        + "\nMetadata document:\n```md\n"
        + metadata_text
        + "\n```\n\nReduced dataset summary:\n```json\n"
        + summary_text
        + "\n```"
    )

    payload = [
        {"role": "system", "content": SYSTEM_MESSAGE},
        {"role": "user", "content": user_content},
    ]

    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
