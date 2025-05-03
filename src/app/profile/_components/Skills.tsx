import { Form, Button, Input } from "antd";
import { Trash2 } from "lucide-react";
import React from "react";


function Skills(){
    return (
        <div className="mt-5">
            <Form.List name={'skills'}>
                {
                    (fields, {add, remove})=> {
                        return <div>
                            <div className="flex gap-5 items-center mb-5">
                                <Button onClick={
                                    () => add()
                                } >
                                    Add Skills
                                </Button>
                            </div>
                            <div className="flex flex-col gap-5">
                                {
                                    fields.map((field, index) => (
                                        <div className="grid grid-cols-4 gap-5 items-end" key={index}>
                                            <Form.Item label="Technology" name={[field.name, "technology"]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="Rating" name={[field.name, "rating"]}>
                                                <Input />
                                            </Form.Item>
                                            <Button onClick={() => remove(field.name)} className="w-max">
                                               <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                }
            </Form.List>
        </div>
    );
}

export default Skills;