import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

// 공통 Input props 인터페이스
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean; // 유효하지 않은 요청 시 표시할 에러 메시지
    'data-testid'?: string; // 테스트 식별자
}

// 공통 Select props 인터페이스
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: { key: string; label: string }[];
    placeholder: string;
}