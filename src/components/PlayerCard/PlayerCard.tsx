import React, { FC, PropsWithChildren } from 'react';
import Card from '../Card/Card';
import clsx from 'clsx';
import gs from '../../global.module.css';
import Button from '../Button/Button';

interface Props extends PropsWithChildren {
    ready: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const PlayerCard: FC<Props> = ({ ready, onClick, children, disabled = false }) => (
    <Card>
        <span className={clsx(gs.fontDefault, gs.textAlignCenter, gs.colorDark)} style={{ padding: '1rem 0' }}>
            {children}
        </span>

        <Button
            label={ready ? 'Ready' : 'Not ready'}
            variant={ready ? 'success' : 'dark'}
            onClick={() => onClick && onClick()}
            disabled={disabled}
        />
    </Card>
);

export default PlayerCard;
