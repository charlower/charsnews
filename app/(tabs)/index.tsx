import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { InputText } from '@/inputs';

import { useSearchNews } from '@/hooks';

export default function HomeScreen() {
  // const [searching, setSearching] = useState(false);
  const { control, getValues, watch, setValue } = useForm({
    defaultValues: { query: '' },
  });
  const q = watch('query');

  const { news, isFetchingNews, errorNews, refetchNews } = useSearchNews(q);

  async function handleSearch() {
    if (!q) return;
    await refetchNews();
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Welcome to Chars News!</ThemedText>
        <HelloWave />
      </ThemedView>
      <InputText
        name='query'
        control={control}
        placeholder={`Search news. I hope it's happy!`}
        multiline={false}
      />
      <Button
        title='Search!'
        isDisabled={q.length === 0 || isFetchingNews}
        isLoading={isFetchingNews}
        onPress={handleSearch}
      />
      {news?.totalResults > 0 &&
        news.articles.map((article: any, index: number) => (
          <ThemedText key={index + article.publishedAt}>
            {article.title}
          </ThemedText>
        ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
