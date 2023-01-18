import React, {useState} from 'react';
import classes from './TopTabBar.module.scss';
import Input, {BorderColor} from "../../inputs/Input/Input";
import DayChoosing from "../DayChoosing";

function TopTabBar({onHabitScheduleChange, defaultValue = {type: null, schedule: null}}: {
    onHabitScheduleChange: (type: string | null, schedule: string | null) => void
    defaultValue?: { type: string | null, schedule: string | null }
}) {
    function getDefaultTabIndex(): number {
        switch (defaultValue.type) {
            case 'interval':
                return 0;
            case 'days':
                return 1;
            case 'week':
                return 2;
            default:
                return 0;
        }
    }


    const [tabIndex, setTabIndex] = useState(getDefaultTabIndex());
    const [type, setType] = useState<string | null>(defaultValue.type);
    const [schedule, setSchedule] = useState<string | null>(defaultValue.schedule);
    let tabs: string[] = ["Интервал", "Ежедневно", "Eженедельно"];

    function handleChanging(type: string, value: string) {
        setType(type);
        let result: string | null = value.replace(/\D/g, '').trim();
        if (result?.trim().length == 0) result = null;
        switch (type) {
            case 'interval':
                if (result == '0') result = '1';
                break
            case 'week':
                if (result == '0') result = '1';
                if (Number(result) > 7) result = '7';
                break
            case 'days':
                break
        }

        setSchedule(result);
        onHabitScheduleChange(type, result);
    }

    return (
        <div className={classes.tabBar}>
            <div className={classes.tabHeader}>
                {tabs.map(function (tabName, index) {
                    return <div className={tabIndex == index ? classes.active : ''} onClick={() => setTabIndex(index)}
                                key={tabName}>
                        {tabName}
                    </div>
                })}
            </div>
            <div className={classes.tabIndicator}
                 style={{left: `calc(calc(100%/3) * ${tabIndex}`, width: 64 + tabIndex * 16}}></div>

            <div className={classes.tabBody}>
                <div className={tabIndex == 0 ? classes.active : ''}>
                    <div className={classes.tabContainer}>
                        <p>Через</p>
                        <Input
                            onChange={(e) => handleChanging('interval', e.target.value)}
                            value={type === 'interval' ? schedule?.toString() ?? '' : ''}
                            maxLength={2}
                            width={52}
                            placeholder={'30'}
                            borderColor={BorderColor.light}/>
                        <p>дней</p>
                    </div>

                </div>
                <div className={tabIndex == 1 ? classes.active : ''}>
                    <DayChoosing
                        value={type === 'days' ? schedule : null}
                        onChange={(value) => handleChanging('days', value?.toString() ?? '')}/>
                </div>
                <div className={tabIndex == 2 ? classes.active : ''}>
                    <div className={classes.tabContainer}>
                        <Input
                            onChange={(e) => handleChanging('week', e.target.value)}
                            value={type === 'week' ? schedule?.toString() ?? '' : ''}
                            maxLength={1}
                            width={40}
                            placeholder={'3'}
                            borderColor={BorderColor.light}/>
                        <p>раз(а) в неделю</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopTabBar;



