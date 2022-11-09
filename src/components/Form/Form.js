import React, { useState } from 'react';
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	// FormMessage,
	FormButton,
	FormTitle,
} from './FormStyles';
import { Container } from '../../globalStyles';
import axios from 'axios'
// import validateForm from './validateForm';

const Form = () => {
	const [searchParameter, setSearchParameter] = useState("");
	const [verificationType, setVerificationType] = useState("NIN-SEARCH");
	const [data, setData] = useState('');
	

	const handleSubmit = async (e) => {
		e.preventDefault();
	 const header = {
      "userId": "1667947854209",
      "apiKey": "DTHswgJl1K3roPN5FeVp",
    }
    const newPost = {
      searchParameter,
      verificationType,
      transactionReference: "",
    };
    try {
      const res = await axios.post("https://api.verified.africa/sfx-verify/v3/id-service/", 
      newPost, 
      {headers: header}                            
      );
      setData(res.data.response)

	  if(res.data.description === "Success"){
        window.location.replace("/pricing");
	  } 
    } catch (err) {
      console.log(err)
    }
	};

	// let result = data.map((d) => d.)
	localStorage.setItem("dataKey", JSON.stringify(data));


	console.log(data)

	const formData = [
    {
      label: "NIN",
      value: searchParameter,
      onChange: (e) => setSearchParameter(e.target.value),
      type: "text",
    },
    {
      label: "Verification Type",
      value: verificationType,
      onChange: (e) => setVerificationType(e.target.value),
      type: "text",
    },
  ];
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>Sign In</FormTitle>
						<FormWrapper onSubmit={handleSubmit}>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}

							<FormButton type="submit">SignIn</FormButton>
						</FormWrapper>
						{/* {error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)} */}
					</FormColumn>
				</FormRow>
			</Container>
		</FormSection>
	);
};

export default Form;
