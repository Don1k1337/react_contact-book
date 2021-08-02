import React from 'react'; 
import styles from './FormControls.module.css';  

export const Input = ({ input, meta, ...props }) => { 
    const hasError = meta.error
    return(
        <div className={ styles.formControl + ' ' + (hasError ? styles.error : '') }>
            <div> <input type="text" { ...input } { ...props } autoComplete="off"/> </div>
            { hasError && <span>{ meta.error }</span> } 
        </div>
    )
}