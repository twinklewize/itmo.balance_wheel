import {ReactNode, useEffect, useRef, useState} from 'react';
import classes from './AccordionItem.module.scss';
import {ChevronDown} from "react-feather";
import {getRefValue} from "../../../../../core/hooks/getRefValue";


function Accordion({title, children, height = 32, horizontalPadding = 16, chevronSize = 16}: {
    title: ReactNode;
    children: ReactNode;
    height?: number;
    horizontalPadding?: number;
    chevronSize?: number;
}) {
    const [isOpen, setIsOpen] = useState(true);
    const [contentHeight, setContentHeight] = useState<number | undefined>();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const contentEl = getRefValue(contentRef);
            setContentHeight(contentEl.scrollHeight);
            return;
        }
        setContentHeight(0);
    }, [isOpen, children]);

    return (
        <div className={`${isOpen ? classes.active : ''}`}>
            <h2 className={classes.title}>
                <button style={{height: height, paddingLeft: horizontalPadding, paddingRight: horizontalPadding}}
                        className={classes.accordionButton} onClick={() => setIsOpen(!isOpen)}>
                    {title}
                    <ChevronDown size={chevronSize} className={classes.chevron}/>
                </button>
            </h2>
            <div className={classes.container} style={{height: contentHeight}}>
                <div ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Accordion;