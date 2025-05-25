import TodoList from './components/todolist';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { DateTimePicker } from '@atlaskit/datetime-picker';
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled, { keyframes } from 'styled-components';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaTiktok, FaEnvelope, FaHome, FaUser, FaCog, FaMoon, FaSun, FaGlobe, FaPen } from 'react-icons/fa';
import AboutUs from './components/AboutUs';
import LANG from './lang';
import Setting from './components/Setting';

const TODO_LIST_KEY = 'TO_DO_APP';
const USERNAME_KEY = 'TODO_APP_USERNAME';
const LANG_KEY = 'TODO_APP_LANG';
const DARKMODE_KEY = 'TODO_APP_DARKMODE';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
  position: relative;

  @media (max-width: 600px) {
    max-width: 100vw;
    min-height: 100vh;
    border-radius: 0;
    box-shadow: none;
    padding: 10px 0 40px 0;
  }
`;

const AppHeader = styled.h3`
  color: #0052CC;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #EBECF0;
  padding-bottom: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  @media (max-width: 600px) {
    font-size: 20px;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-radius: 6px;
    padding-top: 10px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  animation: ${fadeIn} 0.5s ease-in-out;
  width: 100%;
  max-width: 100%;
  @media (max-width: 600px) {
    margin-bottom: 10px;
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    padding: 0 2vw;
    box-sizing: border-box;
  }
`;

const TopNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 56px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  z-index: 100;
  @media (max-width: 600px) {
    height: 48px;
  }
`;

const Hamburger = styled.button`
  margin-left: 12px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 110;
  &:focus {
    outline: 2px solid #0052CC;
  }
  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
    margin-left: 6px;
  }
`;

const Bar = styled.div`
  width: 24px;
  height: 3px;
  background: #172B4D;
  margin: 3px 0;
  border-radius: 2px;
  transition: all 0.3s;
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.15);
  z-index: 105;
`;

const MenuPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #fff;
  box-shadow: 2px 0 12px rgba(0,0,0,0.08);
  border-radius: 0 12px 12px 0;
  padding: 32px 0 16px 0;
  z-index: 120;
  transform: translateX(-100%);
  transition: transform 0.35s cubic-bezier(.77,0,.18,1);
  width: 20vw;
  min-width: 180px;
  max-width: 320px;
  @media (max-width: 900px) {
    width: 28vw;
  }
  @media (max-width: 600px) {
    width: 75vw;
    min-width: 0;
    max-width: 99vw;
    border-radius: 0 12px 12px 0;
    padding: 32px 0 16px 0;
  }
  &.open {
    transform: translateX(0);
  }
`;

const MenuItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 12px 24px;
  font-size: 16px;
  color: #172B4D;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #F4F5F7;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
`;

const ModalTitle = styled.h3`
  color: #0052CC;
  margin-bottom: 18px;
`;

const ModalInput = styled.input`
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #DFE1E6;
  width: 80%;
  margin-bottom: 18px;
  outline: none;
`;

const ModalButton = styled.button`
  padding: 8px 20px;
  background: #0052CC;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #0747A6; }
`;

function App() {
  // state, props, context, refs
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(new Date().toISOString());
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(() => localStorage.getItem(USERNAME_KEY) || '');
  const [showUsernameModal, setShowUsernameModal] = useState(!localStorage.getItem(USERNAME_KEY));
  const [usernameInput, setUsernameInput] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(DARKMODE_KEY)==='true');
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || 'vi');

  useEffect(() => {
    if(localStorage.getItem(TODO_LIST_KEY)){
      const storageTodoList = JSON.parse(localStorage.getItem(TODO_LIST_KEY));
      if(storageTodoList.length > 0){
        setTodoList(storageTodoList);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onDateTimeChange = useCallback((value) => {
    setSelectedDateTime(value);
  }, []);

  const onAddButtonClick = useCallback((e) => {
    if (!textInput.trim()) return;
    
    setTodoList([...todoList, { 
      id: uuidv4(), 
      name: textInput, 
      isCompleted: false,
      datetime: selectedDateTime
    }]);
    setTextInput('');
    // Reset to current date and time
    setSelectedDateTime(new Date().toISOString());
  }, [todoList, textInput, selectedDateTime]);

  const checkButtonClick = useCallback((id) => {
    setTodoList(prevState => prevState.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
  }, [todoList]);

  const handleDeleteTodo = useCallback((id) => {
    setTodoList(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const handleEditTodo = useCallback((id, newName, newDatetime) => {
    setTodoList(prev => prev.map(todo => todo.id === id ? { ...todo, name: newName, datetime: newDatetime } : todo));
  }, []);

  const handleSaveUsername = () => {
    if (usernameInput.trim()) {
      setUsername(usernameInput.trim());
      localStorage.setItem(USERNAME_KEY, usernameInput.trim());
      setShowUsernameModal(false);
    }
  };

  return (
    <>
      <TopNav>
        <Hamburger onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
        <span style={{fontWeight:600, fontSize:18, marginLeft:16, color:'#0052CC'}}>Todo App</span>
      </TopNav>
      {menuOpen && <MenuOverlay onClick={() => setMenuOpen(false)} />}
      <MenuPanel className={menuOpen ? 'open' : ''}>
        <MenuItem onClick={() => { setCurrentPage('home'); setMenuOpen(false); }}>
          <FaHome style={{marginRight: 10}} /> Home
        </MenuItem>
        <MenuItem onClick={() => { setCurrentPage('about'); setMenuOpen(false); }}>
          <FaUser style={{marginRight: 10}} /> About Us
        </MenuItem>
        <MenuItem onClick={() => { setCurrentPage('setting'); setMenuOpen(false); }}>
          <FaCog style={{marginRight: 10}} /> Setting
        </MenuItem>
      </MenuPanel>
      <div style={{height:56}} />
      {showUsernameModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>Nhập tên của bạn</ModalTitle>
            <ModalInput
              placeholder="Tên của bạn..."
              value={usernameInput}
              onChange={e => setUsernameInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSaveUsername(); }}
              autoFocus
            />
            <br />
            <ModalButton onClick={handleSaveUsername}>Lưu</ModalButton>
          </ModalBox>
        </ModalOverlay>
      )}
      {currentPage === 'home' && (
        <AppContainer>
          <AppHeader>
            {username ? `Danh sách cần làm của ${username}` : 'Danh sách cần làm'}
          </AppHeader>
          <FormGroup>
            <Textfield 
              name="todo" 
              placeholder="Thêm công việc cần làm"
              elemAfterInput={
                <Button 
                  isDisabled={!textInput} 
                  appearance='primary' 
                  onClick={onAddButtonClick}
                  style={{ marginRight: 3 }}
                >
                  Thêm
                </Button>
              }
              css={{
                padding: '2px 2px 2px',
              }}
              value={textInput}
              onChange={onTextInputChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && textInput) {
                  onAddButtonClick();
                }
              }}
            />
          </FormGroup>
          <FormGroup>
            <DateTimePicker
              onChange={onDateTimeChange}
              value={selectedDateTime}
              datePickerProps={{
                placeholder: 'Chọn ngày',
              }}
              timePickerProps={{
                placeholder: 'Chọn giờ',
              }}
              timeFormat="h:mm a"
              dateFormat="DD/MM/YYYY"
            />
          </FormGroup>
          <TodoList 
            todoList={todoList} 
            onCheckButtonClick={checkButtonClick} 
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        </AppContainer>
      )}
      {currentPage === 'about' && <AboutUs />}
      {currentPage === 'setting' && (
        <Setting
          username={username}
          setUsername={setUsername}
          setShowUsernameModal={setShowUsernameModal}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          lang={lang}
          setLang={setLang}
          LANG={LANG}
          USERNAME_KEY={USERNAME_KEY}
          DARKMODE_KEY={DARKMODE_KEY}
          LANG_KEY={LANG_KEY}
        />
      )}
    </>
  );
}

export default App;
