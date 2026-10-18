from gtts import gTTS
from pathlib import Path

# Create the audio folder inside public
audio_folder = Path("public/audio")
audio_folder.mkdir(parents=True, exist_ok=True)

# Kannada phrases for NammaConnect
phrases = {
    1: "ನಮಸ್ಕಾರ",
    2: "ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ",
    3: "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?",
    4: "ಇದರ ಬೆಲೆ ಎಷ್ಟು?",
    5: "ನನಗೆ ನೀರು ಬೇಕು",
    6: "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ",
    7: "ನಿಮ್ಮ ಹೆಸರೇನು?",
    8: "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ",
    9: "ನನಗೆ ಸಹಾಯ ಬೇಕು",
    10: "ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?",
}

# Generate and save the audio files
for phrase_id, kannada_text in phrases.items():
    try:
        audio = gTTS(text=kannada_text, lang="kn")
        filename = audio_folder / f"{phrase_id}.mp3"
        audio.save(str(filename))
        print(f"Created: {filename}")

    except Exception as error:
        print(f"Error generating phrase {phrase_id}: {error}")

print("Audio generation finished!")
