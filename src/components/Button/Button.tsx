import React, { FC } from "react"

interface ButtonProps {
    label: string
}

const Button: FC<ButtonProps> = ({label}) => {
    return (
        <button>{label}</button>
    )
}

export default Button
