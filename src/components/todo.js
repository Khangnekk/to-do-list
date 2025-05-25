import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import Button from '@atlaskit/button';
import CheckIcon from '@atlaskit/icon/glyph/check';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import EditorEditIcon from '@atlaskit/icon/glyph/editor/edit';
import { DateTimePicker } from '@atlaskit/datetime-picker';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const checkAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 82, 204, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(0, 82, 204, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 82, 204, 0);
  }
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  border: 1px solid #EBECF0;
  border-radius: 8px;
  padding: 12px 12px 32px 12px; /* extra bottom padding for datetime */
  transition: all 0.3s ease;
  background-color: #FFFFFF;
  position: relative;
  
  &:hover {
    border-color: #DFE1E6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  ${props => props.isCompleted && css`
    background-color: #E3FCEF;
    border-color: #ABF5D1;
  `}
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TodoContentRow = styled.div`
  font-size: 16px;
  color: #172B4D;
  font-weight: 500;
  padding: 8px 0 0 0;
  border-top: 1px solid #F4F5F7;
  margin-top: 6px;
  word-break: break-word;
  min-height: 28px;
  ${props => props.isCompleted && css`
    text-decoration: line-through;
    color: #5E6C84;
  `}
`;

const CheckButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #0052CC;
  background-color: ${props => props.isCompleted ? '#36B37E' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background-color: ${props => props.isCompleted ? '#36B37E' : '#DEEBFF'};
    transform: scale(1.1);
  }
  
  ${props => props.isCompleted && css`
    animation: ${checkAnimation} 0.3s ease forwards;
  `}
`;

const IconButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  padding: 0;
  &:hover {
    background-color: #F4F5F7;
    transform: scale(1.1);
  }
  &.edit, &.delete {
    border: 1px solid #DFE1E6;
  }
  &.edit:hover {
    background-color: #DEEBFF;
  }
  &.delete:hover {
    background-color: #FFEBE6;
  }
`;

const DateTimeInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background-color: ${props => props.isCompleted ? '#E3FCEF' : '#F4F5F7'};
  border-radius: 4px;
  font-size: 12px;
  color: #6B778C;
  width: fit-content;
  transition: all 0.3s ease;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  z-index: 2;
  &:hover {
    background-color: ${props => props.isCompleted ? '#ABF5D1' : '#DEEBFF'};
    color: #0052CC;
  }
  svg {
    margin-right: 6px;
  }
`;

const PriorityBadge = styled.div`
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
  background-color: ${props => {
    switch(props.priority) {
      case 'high': return '#FFEBE6';
      case 'medium': return '#FFFAE6';
      default: return '#E3FCEF';
    }
  }};
  color: ${props => {
    switch(props.priority) {
      case 'high': return '#DE350B';
      case 'medium': return '#FF991F';
      default: return '#006644';
    }
  }};
`;

const ActionButtonsContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
  z-index: 3;
`;

export default function Todo({ todo, onCheckButtonClick, style, className, onDelete, onEdit }) {
    // Format the datetime for display
    const formatDateTime = (datetimeStr) => {
        if (!datetimeStr) return '';
        
        const date = new Date(datetimeStr);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        
        return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
    };

    // Determine if the task is due soon (within 24 hours)
    const isTaskDueSoon = (datetimeStr) => {
        if (!datetimeStr) return false;
        
        const taskDate = new Date(datetimeStr);
        const now = new Date();
        const timeDiff = taskDate - now;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        return hoursDiff > 0 && hoursDiff < 24;
    };

    // Priority is just for UI demonstration - would be part of the todo object in a real app
    const priority = todo.name.toLowerCase().includes('urgent') ? 'high' : 
                    todo.name.toLowerCase().includes('important') ? 'medium' : 'low';

    const dueSoon = isTaskDueSoon(todo.datetime);

    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.name);
    const [editDate, setEditDate] = useState(todo.datetime);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditValue(todo.name);
        setEditDate(todo.datetime);
    };

    const handleEditSave = () => {
        if (editValue.trim() && (editValue !== todo.name || editDate !== todo.datetime)) {
            onEdit(todo.id, editValue, editDate);
        }
        setIsEditing(false);
    };

    const handleEditKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEditSave();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    return (
        <TodoContainer 
            style={style} 
            className={className}
            isCompleted={todo.isCompleted}
        >
            <TopRow>
                <LeftGroup>
                  <CheckButton 
                      isCompleted={todo.isCompleted}
                      onClick={() => onCheckButtonClick(todo.id)}
                  >
                      {todo.isCompleted && <CheckIcon primaryColor='#FFFFFF' size="small" />}
                  </CheckButton>
                  {todo.datetime && !isEditing && (
                    <DateTimeInfo isCompleted={todo.isCompleted} style={dueSoon ? {animation: `${pulseAnimation} 2s infinite`} : {}}>
                        <CalendarIcon size="small" label="Calendar" primaryColor={dueSoon ? "#DE350B" : "#6B778C"} />
                        <span>{formatDateTime(todo.datetime)}</span>
                    </DateTimeInfo>
                  )}
                  {isEditing && (
                    <DateTimePicker
                      value={editDate}
                      onChange={setEditDate}
                      timeFormat="h:mm a"
                      dateFormat="DD/MM/YYYY"
                      style={{ minWidth: 180 }}
                    />
                  )}
                </LeftGroup>
                <RightGroup>
                  <IconButton className="edit" title="Chỉnh sửa" onClick={handleEditClick}>
                      <EditorEditIcon primaryColor="#0052CC" size="small" />
                  </IconButton>
                  <IconButton className="delete" title="Xóa" onClick={() => onDelete(todo.id)}>
                      <TrashIcon primaryColor="#DE350B" size="small" />
                  </IconButton>
                </RightGroup>
            </TopRow>
            <TodoContentRow isCompleted={todo.isCompleted}>
                {isEditing ? (
                  <input
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onBlur={handleEditSave}
                    onKeyDown={handleEditKeyDown}
                    autoFocus
                    style={{
                      fontSize: 16,
                      padding: '6px 10px',
                      borderRadius: 4,
                      border: '1px solid #DFE1E6',
                      width: '100%',
                      outline: 'none',
                    }}
                  />
                ) : (
                  <>
                    {todo.name}
                    {priority !== 'low' && <PriorityBadge priority={priority}>{priority}</PriorityBadge>}
                  </>
                )}
            </TodoContentRow>
        </TodoContainer>
    )
}
