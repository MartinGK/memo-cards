import CardWordsToRelate from '../components/CardRelationToLearn'
import NothingMoreToLearn from '../components/NothingMoreToLearnMessage'
import Layout from "../layout";

export default function Learn() {
  return (
    <Layout>
        <CardWordsToRelate />
        <NothingMoreToLearn />
    </Layout>
  )
}