import { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { InputText } from '@/inputs';

import { useSearchNews } from '@/hooks';

export default function HomeScreen() {
  const { control, watch } = useForm({
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
      headerBackgroundColor={{ light: '#f1f1f1', dark: '#000' }}
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
      <FlatList
        data={news?.articles}
        keyExtractor={(item, index) => `${index}-${item.publishedAt}`} // Unique key for each item
        renderItem={({ item }) => <Article article={item} />}
        contentContainerStyle={{ gap: 20 }}
      />
    </ParallaxScrollView>
  );
}

function Article({ article }: { article: any }) {
  const { title, publishedAt, content, author } = article;
  return (
    <View style={{ gap: 10 }}>
      <View style={{ gap: 2 }}>
        <ThemedText type='subtitle'>{title}</ThemedText>
        <ThemedText type='defaultSemiBold'>{author}</ThemedText>
        <ThemedText type='defaultSemiBold'>{publishedAt}</ThemedText>
      </View>
      <ThemedText>{content}</ThemedText>
    </View>
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
