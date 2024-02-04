import React, { useContext, useEffect, useState } from 'react'

interface FormValue {
    [key: string]: any
}

const FormContext = React.createContext({
    value: {} as FormValue,
    onChange: (name: string, value: any) => { }
});

export function useFormContext() {
    return useContext(FormContext);
}

interface Props {
    title?: string;
    className?: string;
    formValue?: FormValue,
    onChange?: (val: React.SetStateAction<FormValue>) => void,
    onSubmit?: (val: FormValue) => void,
    children: React.ReactNode
}

export default function Form(props: Props) {
    const [formValue, setFormValue] = useState<FormValue>({})


    useEffect(() => {
        if (props.formValue) {
            setFormValue(props.formValue)
        } else {
            setFormValue({});
        }
    }, [props.formValue])

    return (
        <div className={props.className}>
            {
                props.title && (
                    <h2 className='text-center'>
                        <strong>{props.title}</strong>
                    </h2>
                )
            }
            <form onSubmit={e => {
                e.preventDefault();
                props.onSubmit?.(formValue);
            }}>
                <FormContext.Provider value={{
                    value: props.formValue || formValue,
                    onChange: (name, value) => {
                        if (props.onChange) {
                            props.onChange(prev => {
                                return {
                                    ...prev,
                                    [name]: value
                                }
                            })
                            return;
                        }
                        setFormValue(prev => {
                            return {
                                ...prev,
                                [name]: value
                            }
                        })
                    }
                }}>
                    {props.children}
                </FormContext.Provider>
            </form>
        </div>
    )
}

interface InputProps {
    name: string,
    required?: boolean,
    type?: React.HTMLInputTypeAttribute,
    label?: string,
    disabled?: boolean,
    textArea?: boolean,
    placeholder: string
}

function FormInput(props: InputProps) {
    const { value, onChange } = useFormContext();
    return <div className='form-group mt-3'>
        {props.label && <label >{props.label}</label>}
        {
            props.textArea ? (
                <textarea disabled={props.disabled} className='form-control' required={props.required}
                    value={value[props.name]} placeholder={props.placeholder} onChange={e => onChange(props.name, e.currentTarget.value)}></textarea>
            ) : (
                <input disabled={props.disabled} className='form-control' required={props.required} type={props.type}
                    value={value[props.name]} placeholder={props.placeholder} onChange={e => onChange(props.name, e.currentTarget.value)} />
            )
        }
    </div>
}

interface SelectProps {
    name: string,
    required?: boolean,
    label?: string,
    data: { value: any, label: string }[]
}

function FormSelect(props: SelectProps) {
    const { value, onChange } = useFormContext();
    return (
        <div className='form-group mt-3'>
            {props.label && <label >{props.label}</label>}
            <select className='form-control' value={value[props.name]} onChange={e => onChange(props.name, e.currentTarget.value)} >
                <option value="">Select...</option>
                {
                    props.data.map(opt => {
                        return (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

function MultipleSelect(props: SelectProps) {
    const { value, onChange } = useFormContext();
    const selected = value[props.name] || [];
    const available = props.data.filter(e => !selected.includes(e.value));

    return (
        <div className='form-group mt-3'>
            {props.label && <label >{props.label}</label>}
            <select className='form-control' onChange={e => {
                onChange(props.name, [...selected, e.currentTarget.value])
            }} required={props.required}>
                {
                    available.map(opt => {
                        return (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        )
                    })
                }
            </select>
            <ul className='list mt-2'>
                {
                    selected.map((elem: any) => {
                        return (
                            <li key={elem}>
                                <div className='flex pt-1'>
                                    <div>
                                        {props.data.find(e => e.value == elem)?.label}
                                    </div>
                                    <button className='btn btn-danger' onClick={() => {
                                        onChange(props.name, selected.filter((e: any) => e != elem))
                                    }}>Delete</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )


}

Form.MultipleSelect = MultipleSelect;
Form.Select = FormSelect;
Form.Input = FormInput;