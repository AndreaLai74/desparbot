import React, { useState, useCallback, useEffect } from 'react'
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css';

function Form() {

        const [nome, setNome] = useState('');
        const [cognome, setCognome] = useState('');
        const [subject, setSubject] = useState('physical');

        const { tg } = useTelegram();

        const onSendData = useCallback(() => {
                const data = {
                        nome,
                        cognome
                };
                tg.sendData(JSON.stringify(data));
        }, [nome, cognome]);

        useEffect(() => {
                tg.onEvent('mainButtonClicked', onSendData);
                return () => {
                        tg.offEvent('mainButtonClicked', onSendData);
                }
        }, [onSendData]);

        const onChangeNome = (e) => {
                setNome(e.target.value);
        }

        const onChangeCognome = (e) => {
                setCognome(e.target.value);
        }

        const onChangeSubject = (e) => {
                setSubject(e.target.value);
        }

        useEffect(() => {
                tg.MainButton.setParams({
                        text: 'Dati della fidelity',

                });
        });

        useEffect(() => {
                if (!nome || !cognome) {
                        tg.MainButton.hide();
                } else {
                        tg.MainButton.show();
                }
        }, [nome, cognome]);

        return (
                <div className={'form'}>
                        <h3>Inserisci i tuoi dati</h3>
                        <input className={'input'}
                                type="text"
                                placeholder={'Nome'}
                                value={nome}
                                onChange={onChangeNome} />
                        <input className={'input'}
                                type="text"
                                placeholder={'Cognome'}
                                value={cognome}
                                onChange={onChangeCognome}
                        />
                        <select className={'select'} onChange={onChangeSubject}>
                                <option value={'physical'}>09100 Cagliari</option>
                                <option value={'legal'}>09124 Cagliari</option>
                                <option value={'legal'}>09045 Quartu Sant'Elena</option>
                                <option value={'legal'}>09047 Selargius</option>
                                <option value={'legal'}>07100 Sassari</option>
                        </select>
                </div>
        )
}

export default Form;
