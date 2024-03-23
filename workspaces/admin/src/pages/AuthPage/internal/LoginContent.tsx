import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Stack } from '@chakra-ui/react';
import { useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '../../../features/auth/hooks/useLogin';
type FormInput = {
  email: string;
  password: string;
};
export const LoginContent: React.FC = () => {
  const login = useLogin();
  const loginContentA11yId = useId();
  const [{ email, password }, setForm] = useState<FormInput>({ email: '', password: '' });
  const [{ email: emailError, password: passwordError }, setError] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError((prev) => ({ ...prev, email: 'メールアドレスを入力してください' }));
    }

    if (!password) {
      setError((prev) => ({ ...prev, password: 'パスワードを入力してください' }));
    }

    if (!email.includes('@')) {
      setError((prev) => ({ ...prev, email: 'メールアドレスには @ を含めてください' }));
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
      setError((prev) => ({ ...prev, password: 'パスワードには記号を含めてください' }));
    }
    login.mutate({ email, password });
  };

  return (
    <Box
      aria-labelledby={loginContentA11yId}
      onSubmit={handleSubmit}
      as="form"
      bg="gray.100"
      borderRadius={8}
      p={6}
      w="100%"
    >
      <Stack spacing={4}>
        <Heading as="h1" fontSize="xl" fontWeight="bold" id={loginContentA11yId}>
          ログイン
        </Heading>

        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            onChange={handleChange}
            bgColor="white"
            borderColor="gray.300"
            name="email"
            placeholder="メールアドレス"
            value={email}
          />
          <FormErrorMessage role="alert">{emailError}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <Input
            onChange={handleChange}
            bgColor="white"
            borderColor="gray.300"
            name="password"
            placeholder="パスワード"
            type="password"
            value={password}
          />
          <FormErrorMessage role="alert">{passwordError}</FormErrorMessage>
        </FormControl>

        <Spacer />

        <Button colorScheme="teal" type="submit" variant="solid">
          ログイン
        </Button>
      </Stack>
    </Box>
  );
};
