import React from 'react';
import './Header.css';

function Header({title="Keys",columns, onSave, onAddLine}) {

const cols = columns.map((c) => (<p key={c} className="header__col">{c}</p>));

    return (
        <div className="header">
            <div className="header__actions">
                <button onClick={() => onSave()}>Save</button>
                <button onClick={() => onAddLine()}>Add</button>
            </div>
            {cols}
        </div>
    )
}

export default Header;