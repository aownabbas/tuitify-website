import React, { useState, useRef } from 'react';

const OTPInput = ({ numInputs, onComplete }) => {
  const [otp, setOTP] = useState(Array(numInputs).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value;
    setOTP(newOTP);

    if (newOTP[index] !== '' && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    if (newOTP.every((value) => value !== '')) {
      onComplete(newOTP.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index]) {
      const newOTP = [...otp];
      newOTP[index - 1] = '';
      setOTP(newOTP);

      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, numInputs);
    const newOTP = [...otp];

    for (let i = 0; i < numInputs; i++) {
      newOTP[i] = pastedData[i] || '';
    }

    setOTP(newOTP);
    if (newOTP.every((value) => value !== '')) {
      onComplete(newOTP.join(''));
    }
  };

  const handleInputRef = (ref, index) => {
    inputRefs.current[index] = ref;
  };

  return (
    <div>
      {Array.from({ length: numInputs }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(ref) => handleInputRef(ref, index)}
          style={{
            width: '40px',
            height: '40px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            margin: '0 5px',
            textAlign: 'center',
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
