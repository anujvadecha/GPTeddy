import React, { useState } from 'react';

const EducationalControls = () => {
    const [personality, setPersonality] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [age, setAge] = useState('');
    const [messageCount, setMessageCount] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'personality') {
            setPersonality(value);
        } else if (name === 'selectedSubjects') {
            setSelectedSubjects(Array.from(event.target.selectedOptions, (option) => option.value));
        } else if (name === 'age') {
            setAge(value);
        } else if (name === 'messageCount') {
            setMessageCount(value);
        }
        setIsDirty(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle the form submission
        setIsDirty(false);
    };

    return (
        <div className="flex flex-col items-center mt-5 h-screen bg-gray-100">
            <img
                src="https://via.placeholder.com/150"
                alt="Teddy Bear"
                className="rounded-full h-40 w-40 border-2 border-blue-500 mb-4"
            />
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="personality" className="block font-bold mb-2">
                        Teddy Bear Personality
                    </label>
                    <textarea
                        id="personality"
                        name="personality"
                        className="w-full h-24 px-3 py-2 border rounded-lg resize-none"
                        value={personality}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="selectedSubjects" className="block font-bold mb-2">
                        Subjects
                    </label>
                    <select
                        id="selectedSubjects"
                        name="selectedSubjects"
                        className="w-full h-10 px-3 py-2 border rounded-lg"
                        value={selectedSubjects}
                        onChange={handleInputChange}
                        multiple
                    >
                        <option value="math">Math</option>
                        <option value="geography">Geography</option>
                        <option value="history">History</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block font-bold mb-2">
                        Age
                    </label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        className="w-full h-10 px-3 py-2 border rounded-lg"
                        value={age}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="messageCount" className="block font-bold mb-2">
                        Message Count
                    </label>
                    <div className="flex items-center justify-between">
                        <input
                            id="messageCount"
                            name="messageCount"
                            type="number"
                            className="w-full h-10 px-3 py-2 border rounded-lg"
                            value={messageCount}
                            onChange={handleInputChange}
                        />

                        <span className="text-sm text-gray-400 ml-2">messages/day</span>
                    </div>
                </div>

                <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4">
                    Save
                </button>
                {isDirty && (
                    <span className="text-sm text-gray-400 ml-2">*unsaved changes</span>
                )}
            </form>
        </div>
    );
};

export default EducationalControls;
