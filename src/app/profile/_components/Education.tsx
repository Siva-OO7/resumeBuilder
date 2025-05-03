// import React from "react";
// import { Button, Form, Input } from "antd";
// import { Trash2 } from "lucide-react";

// function Education() {
//   return (
//     <div>
//       <Form.List name="education">
//         {(fields, { add, remove }) => {
//           return (
//             <div>
//               <div className="flex gap-5 items-center mb-5">
//                 <Button size="small" onClick={() => add()}>
//                   Add education
//                 </Button>
//               </div>

//               <div className="flex flex-col gap-5">
//                 {fields.map((field, index) => (
//                   <div className="grid grid-cols-4 gap-5 items-end" key={index}>
//                     <Form.Item
//                       label="Qualification"
//                       name={[field.name, "qualification"]}
//                     >
//                       <Input />
//                     </Form.Item>

//                     <Form.Item 
//                        label="School/College"
//                        name={
//                         [
//                           field.name, "schoolOrCollege"
//                         ]
//                        }>
//                       <Input placeholder="Enter your school/college name" />
//                     </Form.Item>

//                     <Form.Item
//                       label="Year of Passing"
//                       name={[field.name, "yearOfPassing"]}
//                     >
//                       <Input />
//                     </Form.Item>

//                     <Button
//                       onClick={() => remove(field.name)}
//                       className="w-max"
//                     >
//                       <Trash2 size={16} />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         }}
//       </Form.List>
//     </div>
//   );
// }

// export default Education;



// import React from "react";
// import { Button, Form, Input, DatePicker } from "antd";
// import { Trash2 } from "lucide-react";

// function Education() {
//   return (
//     <div>
//       <Form.List name="education">
//         {(fields, { add, remove }) => {
//           return (
//             <div>
//               <div className="flex gap-5 items-center mb-5">
//                 <Button size="small" onClick={() => add()}>
//                   Add education
//                 </Button>
//               </div>

//               <div className="flex flex-col gap-5">
//                 {fields.map((field, index) => (
//                   <div className="grid grid-cols-4 gap-5 items-end" key={index}>
//                     {/* Qualification Field with Validation */}
//                     <Form.Item
//                       label="Qualification"
//                       name={[field.name, "qualification"]}
//                       rules={[{ required: true, message: "Please enter a qualification" }]} // Required validation
//                     >
//                       <Input />
//                     </Form.Item>

//                     {/* School/College Field */}
//                     <Form.Item
//                       label="School/College"
//                       name={[field.name, "schoolOrCollege"]}
//                       rules={[{ required: true, message: "Please enter a school/college" }]}
//                     >
//                       <Input placeholder="Enter your school/college name" />
//                     </Form.Item>

//                     {/* Qualification Percentage Field */}
//                     <Form.Item
//                       label="Qualification Percentage"
//                       name={[field.name, "qualificationPercentage"]}
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter your qualification percentage",
//                         },
//                         {
//                           type: "number",
//                           min: 0,
//                           max: 100,
//                           message: "Percentage must be between 0 and 100",
//                         },
//                       ]}
//                     >
//                       <Input type="number" placeholder="Enter percentage" />
//                     </Form.Item>

//                     {/* Start Year Field */}
//                     <Form.Item
//                       label="Year of Passing (Start)"
//                       name={[field.name, "startYear"]}
//                       rules={[{ required: true, message: "Please select start year" }]}
//                     >
//                       <DatePicker
//                         picker="year"
//                         style={{ width: "100%" }}
//                         format="YYYY"
//                         placeholder="Select start year"
//                       />
//                     </Form.Item>

//                     {/* End Year Field */}
//                     <Form.Item
//                       label="Year of Passing (End)"
//                       name={[field.name, "endYear"]}
//                       rules={[{ required: true, message: "Please select end year" }]}
//                     >
//                       <DatePicker
//                         picker="year"
//                         style={{ width: "100%" }}
//                         format="YYYY"
//                         placeholder="Select end year"
//                       />
//                     </Form.Item>

//                     {/* Remove Button */}
//                     <Button onClick={() => remove(field.name)} className="w-max">
//                       <Trash2 size={16} />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         }}
//       </Form.List>
//     </div>
//   );
// }

// export default Education;



import React from "react"; 
import { Button, Form, Input, DatePicker } from "antd";
import { Trash2 } from "lucide-react";

function Education() {
  return (
    <div>
      <Form.List name="education">
        {(fields, { add, remove }) => {
          return (
            <div>
              <div className="flex gap-5 items-center mb-5">
                <Button size="small" onClick={() => add()}>
                  Add education
                </Button>
              </div>

              <div className="flex flex-col gap-5">
                {fields.map((field, index) => (
                  <div
                    className="mb-5 p-5 border border-gray-400"
                    key={index}
                  >
                    {/* Two Fields per Row */}
                    <div className="grid grid-cols-2 gap-5">
                      {/* Qualification Field */}
                      <Form.Item
                        label="Qualification"
                        name={[field.name, "qualification"]}
                        rules={[{ required: true, message: "Please enter a qualification" }]}
                      >
                        <Input />
                      </Form.Item>

                      {/* School/College Field */}
                      <Form.Item
                        label="School/College"
                        name={[field.name, "schoolOrCollege"]}
                        rules={[{ required: true, message: "Please enter a school/college" }]}
                      >
                        <Input placeholder="Enter your school/college name" />
                      </Form.Item>
                    </div>

                    {/* Year Fields in Single Row */}
                    <div className="grid grid-cols-2 gap-5 items-end">
                      {/* Start Year Field */}
                      {/* <Form.Item
                        label="Start Year"
                        name={[field.name, "startYear"]}
                        rules={[{ required: true, message: "Please select start year" }]}
                      >
                        <DatePicker
                          picker="year"
                          style={{ width: "100%" }}
                          format="YYYY"
                          placeholder="Select start year"
                        />
                      </Form.Item> */}

                      <Form.Item label='Start Date' name={[field.name, "startDate"]}>
                        <Input />
                      </Form.Item>

                      {/* End Year Field */}
                      {/* <Form.Item
                        label="End date"
                        name={[field.name, "endYear"]}
                        rules={[{ required: true, message: "Please select end year" }]}
                      >
                        <DatePicker
                          picker="year"
                          style={{ width: "100%" }}
                          format="YYYY"
                          placeholder="Select end year"
                        />
                      </Form.Item> */}
                      <Form.Item label='End Date' name={[field.name, 'endDate']}>
                        <Input />
                      </Form.Item>
                    </div>

                    {/* Qualification Percentage Field */}
                    <div className="grid grid-cols-2 gap-5">
                      <Form.Item
                        label="Qualification Percentage"
                        name={[field.name, "qualificationPercentage"]}
                        rules={[
                          { required: true, message: "Please enter your qualification percentage" },
                          { type: "number", min: 0, max: 100, message: "Percentage must be between 0 and 100" },
                        ]}
                        getValueFromEvent={(e) => (e.target.value ? Number(e.target.value) : undefined)}
                      >
                        <Input type="number" placeholder="Enter percentage" />
                      </Form.Item>

                      {/* Remove Button (Aligned to End) */}
                      <div className="flex items-center justify-end">
                        <Button onClick={() => remove(field.name)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
}

export default Education;
