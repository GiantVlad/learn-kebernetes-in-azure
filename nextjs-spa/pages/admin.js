import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useEffect, useState} from "react";
import axios from "axios";

export async function getServerSideProps(context) {
    // Access the context object to get request and query details
    const { req, res, query, params } = context;

    console.log("Server log Query Params:", query);

    // Fetch data or perform server-side logic
    const mess = { message: "Hello from the server!" };

    return {
        props: {
            mess, // Pass the fetched data to the page as props
        },
    };
}

export default function Admin({mess}) {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        const fetchData = async () => {
            const result = await axios(
                '/api'
            )
            setData(result.data)
        }
        fetchData()
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>KuberNext App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className={styles.title}>
                    Welcome to KuberNext!
                </h1>

                <div>
                    <h1>Server-Side Rendered Page</h1>
                    <p>{mess.message}</p>
                </div>
            </main>
            <div>
                {data && (
                    <ul>
                        {data.data.map(item => (
                            <li key={item.key}>
                                {item.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                {data && data.username && (
                    <h4>User: {data.username}</h4>
                )}
            </div>

            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel" className={styles.logo}/>
                </a>
            </footer>

            <style jsx>{`
                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }

                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo,
                    Monaco,
                    Lucida Console,
                    Liberation Mono,
                    DejaVu Sans Mono,
                    Bitstream Vera Sans Mono,
                    Courier New,
                    monospace;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system,
                    BlinkMacSystemFont,
                    Segoe UI,
                    Roboto,
                    Oxygen,
                    Ubuntu,
                    Cantarell,
                    Fira Sans,
                    Droid Sans,
                    Helvetica Neue,
                    sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
