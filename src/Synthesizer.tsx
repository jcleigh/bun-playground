import React, { useState } from "react";
import * as Tone from "tone";

interface NoteItem {
    note: string;
    duration: string;
}
interface PianoKeyProps {
    note: string;
    isBlackKey: boolean;
    onClick: (note: string) => void;
}

const PianoKey = ({ note, isBlackKey, onClick }: PianoKeyProps) => (
    <div
        className={`${isBlackKey ? "black-key" : "white-key"}`}
        onClick={() => onClick(note)} // Assuming a default duration of '4n'
    >
        {note}
    </div>
);

const Synthesizer = () => {
    const [isAudioContextStarted, setIsAudioContextStarted] = useState<boolean>(false);
    const [sequence, setSequence] = useState<NoteItem[]>([]);
    const [currentDuration, setCurrentDuration] = useState<string>("8n");
    const notes = [
        "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
        "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"
    ];

    const startAudioContext = async () => {
        await Tone.getTransport().start();
        console.log("AudioContext started");
        setIsAudioContextStarted(true);
    };

    const handleNoteDurationChange = (duration: string) => setCurrentDuration(duration);

    const addToSequence = ({ note, duration }: NoteItem) => setSequence([...sequence, { note, duration }]);

    const playSequence = (): void => {
        if (!isAudioContextStarted) {
            console.warn("AudioContext not started. Please click \"Start AudioContext\" button.");
            return;
        }
        const synth = new Tone.Synth().toDestination();
        let startTime = 0; // Initialize start time to 0

        sequence.forEach((item: NoteItem) => {
            const durationTime = Tone.Time(item.duration).toSeconds();
            synth.triggerAttackRelease(item.note, item.duration, Tone.now() + startTime);
            startTime += durationTime;
        });
    };

    const clearSequence = (): void => {
        setSequence([]);
        Tone.getTransport().cancel();
    };

    const isBlackKey = (note: string): boolean => note.includes("#");

    return (
        <div data-testid="synthesizer">
            <h1>Synthesizer</h1>
            <p>Click on the keys to add notes to the sequence. Press "Play" to play the sequence.</p>
            <div style={{ display: "flex", justifyContent: "space-around", width: "5vw" }}>
                <button
                    onClick={() => handleNoteDurationChange("16n")}
                    style={{
                        backgroundColor: currentDuration === "16n" ? "var(--active-button)" : "var(--inactive-button)",
                        borderRadius: "10px 0 0 10px", // Round only the left corners
                    }}
                >
                    ♬
                </button>
                <button
                    onClick={() => handleNoteDurationChange("8n")}
                    style={{
                        backgroundColor: currentDuration === "8n" ? "var(--active-button)" : "var(--inactive-button)",
                        borderRadius: "0", // No rounded corners
                    }}
                >
                    ♪
                </button>
                <button
                    onClick={() => handleNoteDurationChange("4n")}
                    style={{
                        backgroundColor: currentDuration === "4n" ? "var(--active-button)" : "var(--inactive-button)",
                        borderRadius: "0 10px 10px 0", // Round only the right corners
                    }}
                >
                    ♩
                </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}></div>

            <div className="piano">
                {notes.map(note => (
                    <PianoKey
                        key={note}
                        note={note}
                        isBlackKey={isBlackKey(note)}
                        onClick={() => addToSequence({ note, duration: currentDuration })}
                    />
                ))}
            </div>

            <div style={{ display: "flex", marginTop: "20px" }}>
                {!isAudioContextStarted && (
                    <button onClick={startAudioContext} style={{ /* Button styles */ }}>
                        Start AudioContext
                    </button>
                )}
                {isAudioContextStarted && (
                    <>
                        <button
                            onClick={playSequence}
                            disabled={!isAudioContextStarted}
                            style={{
                                backgroundColor: isAudioContextStarted ? "var(--active-button)" : "var(--inactive-button)",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                cursor: isAudioContextStarted ? "pointer" : "not-allowed",
                                borderRadius: "10px 0 0 10px", // Round only the left corners for the "Play" button
                            }}
                        >
                            Play
                        </button>
                        <button
                            onClick={() => clearSequence()}
                            style={{
                                backgroundColor: sequence.length > 0 ? "var(--cancel-button)" : "var(--inactive-button)",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "0 10px 10px 0", // Round only the right corners for the "Clear" button
                            }}
                        >
                            Clear
                        </button>
                    </>
                )}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}></div>

            <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                {sequence.map((item, index) => (
                    <div key={index} style={{
                        height: "30px",
                        width: `${Tone.Time(item.duration).toSeconds() * 100}px`, // Example scale: 1 second = 100px
                        backgroundColor: "var(--active-button)",
                        margin: "0 5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontWeight: "bold",
                    }}>
                        {item.note}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Synthesizer;