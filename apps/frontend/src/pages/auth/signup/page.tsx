import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface SignupProps {
  email: string;
  username: string;
  name: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupProps>({
    email: "",
    name: "",
    password: "",
    username: "",
  });
  const SignupFields = [
    { fieldName: "Email", type: "email", value: formData.email },
    { fieldName: "Name", type: "text", value: formData.name },
    { fieldName: "Username", type: "username", value: formData.username },
    { fieldName: "Password", type: "password", value: formData.password },
  ];
  return (
    <>
      <div>
        {SignupFields.map((item) => (
          <Input
            type={item.type}
            key={item.fieldName}
            placeholder={item.fieldName}
            value={item.value}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                [item.fieldName]: e.target.value,
              }))
            }
          />
        ))}
      </div>
    </>
  );
};

export default Signup;
