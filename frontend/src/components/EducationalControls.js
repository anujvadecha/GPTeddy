import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { submitPrompt, getPrompt } from '../utilities/api_calls';


const EducationalControls = () => {

    useEffect(() => {
        async function fetchData() {
            const { age, message_count, personality, subjects } = await getPrompt()
            console.log(subjects)

            console.log(age, JSON.parse(subjects))
            setAge(String(age))
            setMessageCount(String(message_count))
            setPersonality(personality)
            // setSelectedSubjects(subjects)


            setSelectedSubjects(JSON.parse(subjects).map((subject) => {

                return { value: subject, label: subject }
            }))

        }
        fetchData()
    }, []);




    const [personality, setPersonality] = useState('');
    const [age, setAge] = useState('');
    const [messageCount, setMessageCount] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const subjects = [
        { value: 'math', label: 'Math' },
        { value: 'geography', label: 'Geography' },
        { value: 'history', label: 'History' },
        { value: 'english', label: 'English' },
        { value: 'science', label: 'Science' },
        { value: 'art', label: 'Art' },
    ];

    const handleChange = (selectedSubjects) => {
        setSelectedSubjects(selectedSubjects);
    };

    const handleRemove = (removedOption) => {
        setSelectedSubjects(selectedSubjects.filter((option) => option.value !== removedOption.value));
        console.log("after removing subject", selectedSubjects)
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'personality') {
            setPersonality(value);
        } else if (name === 'selectedSubjects') {
            setSelectedSubjects(Array.from(event.target.selectedSubjects, (option) => option.value));
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
        const payload = {
            "personality": personality || "Cute bear",
            "age": parseInt(age) || 0,
            // TODO remove toString
            "subjects": selectedSubjects.map(subject => subject.label),
            "message_count": parseInt(messageCount) || 0
        }

        console.log(payload);
        submitPrompt(payload)
    };

    return (
        <div className="flex flex-col items-center h-screen mt-5 bg-gray-100">
            <img
                src="https://via.placeholder.com/150"
                alt="Teddy Bear"
                className="w-40 h-40 mb-4 border-2 border-blue-500 rounded-full"
            />
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="personality" className="block mb-2 font-bold">
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
                    <label htmlFor="subjects" className="block mb-2 font-bold">
                        Subjects
                    </label>
                    <Select
                        isMulti
                        options={subjects}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="age" className="block mb-2 font-bold">
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
                    <label htmlFor="messageCount" className="block mb-2 font-bold">
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

                        <span className="ml-2 text-sm text-gray-400">messages/day</span>
                    </div>
                </div>

                <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg">
                    Save
                </button>
                {isDirty && (
                    <span className="ml-2 text-sm text-gray-400">*unsaved changes</span>
                )}
            </form>
        </div>
    );
};

export default EducationalControls;
