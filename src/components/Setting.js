import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCog, FaMoon, FaSun, FaGlobe } from 'react-icons/fa';

const SettingContainer = styled.div`
  max-width: 420px;
  margin: 40px auto 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 36px 32px 28px 32px;
  @media (max-width: 600px) {
    margin: 24vw 2vw 0 2vw;
    padding: 18px 4vw 18px 4vw;
  }
`;
const SettingTitle = styled.h2`
  color: #0052CC;
  margin-bottom: 28px;
  font-size: 1.5rem;
`;
const SettingLabel = styled.label`
  font-weight: 500;
  color: #253858;
  margin-bottom: 8px;
  display: block;
  font-size: 15px;
  min-width: 110px;
  line-height: 1.5;
`;
const SettingRowFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 28px;
`;
const SettingInputWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 22px;
  box-sizing: border-box;
`;
const SettingInput = styled.input`
  padding: 10px 48px 10px 16px;
  font-size: 16px;
  border-radius: 7px;
  border: 1px solid #DFE1E6;
  width: 100%;
  outline: none;
  box-sizing: border-box;
`;
const OkBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: #0052CC;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  padding: 6px 18px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover { background: #0747A6; transform: translateY(-50%) scale(1.08); }
`;
const Switch = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F4F5F7;
  border: 1px solid #DFE1E6;
  border-radius: 20px;
  padding: 8px 24px;
  font-size: 15px;
  color: #253858;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover { background: #DEEBFF; color: #0052CC; }
`;
const LangSelect = styled.select`
  padding: 10px 18px;
  border-radius: 7px;
  border: 1px solid #DFE1E6;
  font-size: 15px;
  margin-left: 10px;
  min-height: 40px;
  box-sizing: border-box;
`;
const Warning = styled.div`
  margin-top: 38px;
  color: #DE350B;
  font-size: 15px;
  background: #FFEBE6;
  border-radius: 7px;
  padding: 16px 18px;
  text-align: center;
`;
const ErrorMsg = styled.div`
  color: #DE350B;
  font-size: 14px;
  margin: 6px 0 0 2px;
  min-height: 18px;
`;

export default function Setting({ username, setUsername, setShowUsernameModal, darkMode, setDarkMode, lang, setLang, LANG, USERNAME_KEY, DARKMODE_KEY, LANG_KEY }) {
  const [editName, setEditName] = useState(username);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const isValidName = (val) => !/(.)\1{8,}/.test(val);
  const handleSave = () => {
    if (!editName.trim()) {
      setError(lang === 'vi' ? 'Tên không được để trống.' : 'Name cannot be empty.');
      return false;
    }
    if (!isValidName(editName)) {
      setError(lang === 'vi' ? 'Tên không được chứa quá 8 ký tự liên tiếp giống nhau.' : 'Name cannot contain more than 8 consecutive identical characters.');
      return false;
    }
    setUsername(editName.trim());
    localStorage.setItem(USERNAME_KEY, editName.trim());
    setEditing(false);
    setError('');
    return true;
  };
  return (
    <SettingContainer>
      <SettingTitle><FaCog style={{marginRight:8}}/> {LANG[lang].settingTitle}</SettingTitle>
      <SettingLabel>{LANG[lang].changeName}</SettingLabel>
      <SettingInputWrap>
        <SettingInput
          value={editName}
          readOnly={!editing}
          onFocus={() => setEditing(true)}
          onChange={e => {
            setEditName(e.target.value);
            setError('');
          }}
          onBlur={() => {
            if (editing) handleSave();
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && editing) handleSave();
          }}
          maxLength={50}
        />
        {editing && (
          <OkBtn
            onMouseDown={e => { e.preventDefault(); }}
            onClick={handleSave}
          >
            OK
          </OkBtn>
        )}
      </SettingInputWrap>
      <ErrorMsg>{error}</ErrorMsg>
      <SettingRowFlex>
        <SettingLabel style={{marginBottom:0, minWidth:90}}>{LANG[lang].darkMode}</SettingLabel>
        <Switch onClick={()=>{
          setDarkMode(dm=>{
            localStorage.setItem(DARKMODE_KEY, !dm);
            return !dm;
          });
        }}>
          {darkMode ? <FaMoon/> : <FaSun/>}
          {darkMode ? LANG[lang].darkOn : LANG[lang].darkOff}
        </Switch>
      </SettingRowFlex>
      <SettingRowFlex>
        <SettingLabel style={{marginBottom:0, minWidth:90}}><FaGlobe style={{marginRight:6}}/> {LANG[lang].language}</SettingLabel>
        <LangSelect value={lang} onChange={e=>{
          setLang(e.target.value);
          localStorage.setItem(LANG_KEY, e.target.value);
        }}>
          <option value="vi">{LANG[lang].vi}</option>
          <option value="en">{LANG[lang].en}</option>
        </LangSelect>
      </SettingRowFlex>
      <Warning>
        <b>{LANG[lang].warning.split(':')[0]}:</b> {LANG[lang].warning.split(':').slice(1).join(':')}
      </Warning>
    </SettingContainer>
  );
} 