import React, { useContext } from "react"
import Layout, { LangContext } from "../../components/Layouts/Layout"
import NotFoundPageContent from "../../components/Content/NotFoundPageContent"
import MetaData from "../../components/Layouts/MetaData"

const NotFoundPage = () => {
  return (
    <Layout language="uk">
      <NotFoundPageContent />
    </Layout>
  )
}

export default NotFoundPage;

export const Head = () => {

  const { language } = useContext(LangContext);
  const { PAGE_NOT_FOUND_TITLE, PAGE_NOT_FOUND_DESCRIPTION } = require(`../../languages/${language}/languages`);

  const metaData = {
    title: PAGE_NOT_FOUND_TITLE,
    description: PAGE_NOT_FOUND_DESCRIPTION
  };

  return <MetaData data={metaData} />
}