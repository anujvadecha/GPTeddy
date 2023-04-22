import React, { useState } from 'react';
import Select from 'react-select';

const EducationalControls = () => {
    const [personality, setPersonality] = useState('');
    const [age, setAge] = useState('');
    const [messageCount, setMessageCount] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const options = [
        { value: 'math', label: 'Math' },
        { value: 'geography', label: 'Geography' },
        { value: 'history', label: 'History' },
        { value: 'english', label: 'English' },
        { value: 'science', label: 'Science' },
        { value: 'art', label: 'Art' },
    ];

    const handleChange = (selectedOptions) => {
        setSelectedSubjects(selectedOptions);
    };

    const handleRemove = (removedOption) => {
        setSelectedSubjects(selectedSubjects.filter((option) => option.value !== removedOption.value));
    };

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
                    <label htmlFor="subjects" className="block font-bold mb-2">
                        Subjects
                    </label>
                    <Select
                        id="subjects"
                        name="subjects"
                        value={selectedSubjects}
                        options={options}
                        onChange={handleChange}
                        isMulti
                        className="w-full"
                    />
                    <div className="flex flex-wrap mt-2">
                        {selectedSubjects.map((option) => (
                            <div key={option.value} className="inline-flex items-center bg-gray-200 rounded-md px-2 py-1 mt-2 mr-2">
                                <span className="text-sm font-medium text-gray-800 mr-1">{option.label}</span>
                                <button type="button" className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => handleRemove(option)}>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm4.95 12.243l-1.707 1.707L12 13.414l-3.243 3.536-1.707-1.707L10.293 12 6.757 8.464l1.707-1.707L12 10.586l3.536-3.243 1.707 1.707L13.707 12l3.536 3.536z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
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
