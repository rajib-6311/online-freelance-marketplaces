
/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TabCategories = () => {

     const [jobs, setJobs] = useState([]);
     
     useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/Jobs`);
            setJobs(data);
        }
        getData();
     }, []); // Use an empty dependency array to run the effect only once after the initial render


    return (
        <Tabs>
            <div className='container px-6 py-10 mx-auto'>
                <div className='text-center py-10'>
                    <h1 className='text-red-500'>Lorem ipsum dolor sit amet</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /> Facere nulla quae dolor!</p>
                </div>

                <div className='flex items-center justify-center'>
                    <TabList>
                        <Tab>Web Development</Tab>
                        <Tab>Graphics Design</Tab>
                        <Tab>Digital Marketing</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {jobs
                            .filter(j => j.category === 'Web Development')
                            .map(job => (
                                <JobCard 
                                    key={job._id}
                                    job={job}
                                />
                            ))
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {jobs
                            .filter(j => j.category === 'Graphics Design')
                            .map(job => (
                                <JobCard 
                                    key={job._id}
                                    job={job}
                                />
                            ))
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {jobs
                            .filter(j => j.category === 'Digital Marketing')
                            .map(job => (
                                <JobCard 
                                    key={job._id}
                                    job={job}
                                />
                            ))
                        }
                    </div>
                </TabPanel>
            </div>
        </Tabs>
    );
};

export default TabCategories;
