import  React, {useState, useRef, useEffect} from 'react'
import CreatableSelect from 'react-select/creatable'

const components = {
    DropdownIndicator: null
}

const createOption = (input) => ({label: input, value: input})

export default function TextMultiSelect({placeholder = 'Type some stuff...', innerRef = {}, prevOptions = [], isDisabled = false, optionValidator = (val='') => true}) {
    const [inputValue, setInputValue] = useState('')
    const [addedOptions, setAddedOptions] = useState(prevOptions)
    console.log({addedOptions})
    const handleKeyDown = e => {
        if (!inputValue || !optionValidator(inputValue)) return;
        switch (e.key) {
        case 'Enter':
        case 'Tab':
            const newOptions = [...addedOptions, createOption(inputValue)]
            setAddedOptions(() => newOptions);
            setInputValue('');
            e.preventDefault();
            
        }
    }
    useEffect(() => {
        innerRef.current = addedOptions
    }, [addedOptions])

    return (
        <CreatableSelect
            components = {components}
            placeholder = {placeholder}
            inputValue = {inputValue}
            isClearable
            isMulti
            menuIsOpen = {false}
            onChange = {(newValue) => setAddedOptions(newValue)}
            onInputChange = {(newValue) => setInputValue(newValue)}
            onKeyDown = {handleKeyDown}
            value = {addedOptions}
            isDisabled = {isDisabled}
            isValidNewOption = {optionValidator}
        />

    )
}