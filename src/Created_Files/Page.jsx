import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// DOWNLOADED SUCCESS/ERROR SOUND FROM PIXABAY //


function Page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const fileInputRef = useRef(null);
   const [enteredVersion,setEnteredVersion]=useState('');
  const [shake,setShake]=useState(false);


  const [showCalendar , setShowCalendar]=useState(false);
  const [scheduledDate , setScheduledDate] = useState(new Date());

  const success=useRef(new Audio('/sounds/success.mp3'));
  const error=useRef(new Audio('/sounds/error.mp3'));

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

 const handleSubmit = () => {
  if (!selectedFile) {
    error.current.play();
    setShake(true);
    //alert('Please select a file first.');
    toast.error("You have not selected a file. Please Select a file first .")
    setTimeout(() => setShake(false), 500);
    return;
  }

  if (!enteredVersion.trim()) {
    error.current.play();
    setShake(true);
    //alert('Please enter the version.');
    toast.error("Please enter the correct version.")

    setTimeout(() => setShake(false), 500);
    return;
  }

  const fileName = selectedFile.name;
  const fileVersionMatch = fileName.match(/v?(\d+\.\d+\.\d+)/); // Extracts versions like 1.0.2 or v1.0.2

  if (!fileVersionMatch || fileVersionMatch[1] !== enteredVersion.trim()) {
    error.current.play();
    //alert('File version mismatch!');
    toast.error("File version mismatch!")
    setTimeout(() => setShake(false), 500);
    return;
  }

  success.current.play();
  toast.success("File uploaded and version matched successfully!")
  setTimeout(() => setShake(false), 500);
  setFileDetails(selectedFile);
};


  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleScheduleConfirm = async () => {
    try {
      await fetch('http://localhost:5000/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: scheduledDate.toISOString().split('T')[0],
          fileName: fileDetails.name,
        }),
      });
      alert('Release scheduled for ' + scheduledDate.toDateString());
      setShowCalendar(false);
    } catch (err) {
      console.error(err);
      alert('Failed to schedule release');
    }
  };

  return (
    <>
      <style>
        {`
          .upload-box {
            border: 2px dashed #888;
            padding: 20px;
            width: 100vh;
            margin-left: 5vh;
            border-radius: 6px;
            background: #f9f9f9;
            cursor: pointer;
            justify-content: center;
            transition: background-color 0.3s ease;
          }

          .upload-box:hover {
            background-color: #e0e0e0;
          }

          .submit-btn {
            margin-top: 20px;
            padding: 10px 25px;
            background-color: #333;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .submit-btn:hover {
            background-color: #555;
          }
            .shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  100% { transform: translateX(0); }
}
        `}
      </style>

       {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <center>
        <div style={{textAlign: 'center', marginBottom: '10px'}}>
          <label>Enter version </label>
          <input
  type="text"
  id="version"
  name="version"
  placeholder="e.g., 1.0.2"
  value={enteredVersion}
  onChange={(e) => setEnteredVersion(e.target.value)}
  style={{ marginBottom: '10px', padding: '6px', borderRadius: '4px' }}
/>


        </div>
        <div onClick={handleBoxClick} 
        className={`upload-box ${shake ? 'shake' : ''}`}
        >
          <p style={{ marginBottom: '10px', textAlign: 'center', color:'ActiveCaption' }}>
           
            Drag & Drop your file here or click to upload
            
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <p style={{ color: 'blue' }}>{selectedFile?.name}</p>
        </div>

        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </center>

      {fileDetails && (
        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              border: '1px solid #ccc',
              padding: '20px',
              borderRadius: '8px',
              width: '50%',
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{color:'ActiveCaption'}}>
            <h3>File Details</h3>
            <p><strong>Name:</strong> {fileDetails.name}</p>
            <p><strong>Size:</strong> {fileDetails.size} bytes</p>
            <p><strong>Type:</strong> {fileDetails.type}</p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <button
                style={{
                  marginRight: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => alert('Release in Progress')}
              >
                Release
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => setShowCalendar(!showCalendar)}
              >
                Schedule Release
              </button>
            </div>
            {showCalendar && (
              <div style={{ marginTop: '20px' , justifyContent:'center'}}>
                <h4>Select Release Date</h4>
                <DatePicker
                  selected={scheduledDate}
                  onChange={(date) => setScheduledDate(date)}
                  inline
                />
                <button
                  onClick={handleScheduleConfirm}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: 'green',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Confirm Schedule
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
