import { AppText } from './AppText';
import { Card } from './Card';
import { Screen } from './Screen';

/** Pantalla provisional para módulos aún no implementados. */
export function PlaceholderScreen({ title, description }: { title: string; description: string }) {
  return (
    <Screen>
      <AppText variant="title">{title}</AppText>
      <Card>
        <AppText color="textSecondary">{description}</AppText>
      </Card>
    </Screen>
  );
}
