import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface InputTextProps {
  name: string;
  control: any;
  placeholder: string;
  required?: boolean;
  styleAdd?: any;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
}

export default function InputText({
  name,
  control,
  placeholder,
  required = true,
  styleAdd,
  multiline = true,
  onChangeText,
}: InputTextProps) {
  const [height, setHeight] = useState(40);
  const backgroundColor = useThemeColor({}, 'inputBackground');
  const color = useThemeColor({}, 'text');

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={(text) => {
            onChange(text);
            if (onChangeText) {
              onChangeText(text);
            }
          }}
          value={value}
          style={
            [
              { backgroundColor, height, color },
              styles.input,
              { ...styleAdd },
            ] as any
          }
          multiline={multiline}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 20,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
});
