import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { submitPrompt, getPrompt } from '../utilities/api_calls';
import { useDropzone } from 'react-dropzone';

const EducationalControls = () => {

    useEffect(() => {
        async function fetchData() {
            const { age, message_count, personality, subjects } = await getPrompt()
            console.log(subjects)

            console.log(age, subjects)
            setAge(String(age))
            setMessageCount(String(message_count))
            setPersonality(personality)
            // setSelectedSubjects(subjects)


            setSelectedSubjects(subjects.map((subject) => {

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

    const onDrop = (acceptedFiles) => {
        // Do something with the uploaded files, e.g. send to the server
        console.log('Accepted Files:', acceptedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="flex flex-col items-center h-screen mt-5 bg-gray-100">
            <img
                src="https://gptteddy.blob.core.windows.net/images/teddy_bear%201.png"
                alt="Teddy Bear"
                className="w-40 h-40 mb-4 rounded-full border-5 border-brown-500"
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
                        value={selectedSubjects}
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

                <button className="px-8 py-4 mt-8 text-2xl text-white rounded-lg bg-brown-800">
                    Save
                </button>

                <div className="mt-4 mb-4">
                    <label htmlFor="pdfUpload" className="block mb-2 font-bold">
                        Upload Syllabus PDF
                    </label>
                    <div {...getRootProps()} className={`w-full h-32 px-6 py-12 border-2 border-dashed rounded-lg ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-400'}`}>
                        <input {...getInputProps()} id="pdfUpload" name="pdfUpload" type="file" accept=".pdf" className="hidden" />
                        <div className="flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.868 4.868c.47-.469 1.232-.469 1.702 0L10 8.298l3.429-3.43c.469-.47 1.232-.47 1.702 0 .47.469.47 1.232 0 1.701L11.702 10l3.429 3.429c.47.469.47 1.232 0 1.701-.469.47-1.232.47-1.701 0L10 11.702l-3.429 3.429c-.469.47-1.232.47-1.701 0-.47-.469-.47-1.232 0-1.701L8.298 10 4.868 6.571c-.47-.469-.47-1.232 0-1.701z" clipRule="evenodd" />
                            </svg>
                            <p className="text-gray-400">Drag and drop your PDF here, or click to select files</p>
                        </div>
                    </div>
                </div>


                {isDirty && (
                    <span className="ml-2 text-sm text-gray-400">*unsaved changes</span>
                )}
            </form>
        </div>
    );
};

export default EducationalControls;
