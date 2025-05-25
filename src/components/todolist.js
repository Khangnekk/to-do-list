import React from 'react'
import Todo from './todo';
import styled, { keyframes } from 'styled-components';

const staggeredFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const StyledTodo = styled(Todo)`
  opacity: 0;
  animation: ${staggeredFadeIn} 0.5s ease forwards;
  animation-delay: ${props => `${props.index * 0.1}s`};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 20px;
  color: #6B778C;
  border: 2px dashed #DFE1E6;
  border-radius: 8px;
  margin-top: 20px;
  animation: ${staggeredFadeIn} 0.5s ease forwards;
  
  p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  span {
    font-size: 24px;
    display: block;
    margin-bottom: 10px;
  }
`;

export default function TodoList({ todoList, onCheckButtonClick, onDelete, onEdit }) {
    return (
        <TodoListContainer>
            {todoList.length > 0 ? (
                todoList.map((todo, index) => (
                    <StyledTodo 
                        key={todo.id} 
                        todo={todo} 
                        onCheckButtonClick={onCheckButtonClick}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        index={index}
                    />
                ))
            ) : (
                <EmptyState>
                    <span>📝</span>
                    <p>Chưa có công việc nào trong danh sách</p>
                    <p>Hãy thêm công việc mới để bắt đầu!</p>
                </EmptyState>
            )}
        </TodoListContainer>
    )
}
