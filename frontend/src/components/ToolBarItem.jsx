import React from 'react'
import '../assets/styles/Components/ToolBarItem.scss'
import MaterialIcon from '../components/MaterialIcon'
import FontAwesome from '../components/FontAwesome'

export const ItemTypes = {
    FONT_AWESOME: 'FONT_AWESOME',
    MATERIAL_ICON: 'MATERIAL_ICON'
}

const ToolBarItem = ({ nameIcon = 'fas fa-bug', title = '-', active = false, handleClick, type = ItemTypes.FONT_AWESOME }) => {
    const actualClass = !active ? 'ToolBarItem' : 'ToolBarItem--active'

    let icon = <FontAwesome classAdd='ToolBarItem__icon' nameIcon='fas fa-bug' />
    switch (type) {
        case ItemTypes.FONT_AWESOME:
            icon = <FontAwesome classAdd='ToolBarItem__icon' nameIcon={nameIcon} />
            break
        case ItemTypes.MATERIAL_ICON:
            icon = <MaterialIcon classAdd='ToolBarItem__icon' nameIcon={nameIcon} />
            break
    }

    return (
        <div
            className={actualClass}
            onClick={handleClick}>
            {icon}
            <p className='ToolBarItem__title'>{title}</p>
        </div>
    )
}

export default ToolBarItem