import React from 'react'
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
export default function index(props) {
  return (
      <>
      <Head>
          <title>React Meetups</title>
          <meta name="description" content="Browse a huge list of highly active react meetups" />
      </Head>
<MeetupList meetups={props.meetups}/>
      </>
    )
}

export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb+srv://rajthapa:Oa8H2GgoMO6UOuIr@cluster0.lf4pe.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
client.close();
    return{
        props:{
            meetups: meetups.map((meetup)=>({
                title : meetup.title,
                address: meetup.address,
                id: meetup._id.toString(),
                image: meetup.image
            }))
        },
        revalidate: 1
        
    }
}

// export async function getServerSideProps(context){
//     let req = context.req;
//     let res = context.res;
//     return{
//         props: {
//             meetups: Dummy_Meetup
//         }
//     };
// }