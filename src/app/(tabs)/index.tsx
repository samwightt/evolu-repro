import '~/polyfill'
import { Image, StyleSheet, Platform, Text, View } from 'react-native';

import { HelloWave } from '~/components/HelloWave';
import ParallaxScrollView from '~/components/ParallaxScrollView';
import { ThemedText } from '~/components/ThemedText';
import { ThemedView } from '~/components/ThemedView';
import { useQuery } from '@evolu/common-react'
import { evolu } from '~/db/db'
import { Suspense } from 'react';

const query = evolu.createQuery(db => db.selectFrom("todo").selectAll())
const result = evolu.loadQuery(query).then(x => console.log(x))

function Testing() {
  const { rows } = useQuery(query)

  return <View>
    {rows.map((row) => <Text key={row.id}>{row.title}</Text>)}
  </View>
}

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Todos:</Text>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Testing />
      </Suspense>
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
