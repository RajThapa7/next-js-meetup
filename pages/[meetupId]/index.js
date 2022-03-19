import MeetupDetails from "../../components/meetups/MeetupDetails"
import { MongoClient, ObjectId } from "mongodb"
import Head from 'next/head';
export default function index(props) {
  return (
    <>
    <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
    </Head>
   <MeetupDetails image={props.meetupData.image} title={props.meetupData.title} address={props.meetupData.address} description={props.meetupData.description}/>
    </>
  )
}
export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://rajthapa:Oa8H2GgoMO6UOuIr@cluster0.lf4pe.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({},{_id: 1}).toArray();
client.close();
return{
    fallback : true,
    paths:meetups.map((meetup)=>({
        params : {
            meetupId : meetup._id.toString(),
        }
    }))
}
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://rajthapa:Oa8H2GgoMO6UOuIr@cluster0.lf4pe.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)}) 
client.close();    return {
        props:{
            meetupData:{
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
                image: selectedMeetup.image
            }
        }
    }
};
