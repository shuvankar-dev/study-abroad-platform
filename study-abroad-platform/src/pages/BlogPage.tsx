import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const blogs = [
  {
    title: 'Top Universities for International Students',
    author: 'John Doe',
    content: 'Discover the best universities around the world that welcome international students with open arms.',
  },
  {
    title: 'How to Apply for Scholarships Abroad',
    author: 'Jane Smith',
    content: 'Learn the step-by-step process to apply for scholarships and reduce your financial burden.',
  },
  {
    title: 'Visa Guidance for Study Abroad',
    author: 'Emily Johnson',
    content: 'Understand the visa requirements and application process for studying in different countries.',
  },
  {
    title: 'Affordable Study Destinations',
    author: 'Michael Brown',
    content: 'Explore countries that offer quality education at an affordable cost.',
  },
  {
    title: 'Part-Time Work Opportunities for Students',
    author: 'Sarah Wilson',
    content: 'Find out how you can work part-time while studying abroad to support your expenses.',
  },
  {
    title: 'Cultural Adaptation Tips for International Students',
    author: 'David Lee',
    content: 'Learn how to adapt to new cultures and make the most of your study abroad experience.',
  },
  {
    title: 'Best Courses for a Global Career',
    author: 'Sophia Martinez',
    content: 'Discover courses that can help you build a successful international career.',
  },
  {
    title: 'Accommodation Options for Students Abroad',
    author: 'Chris Taylor',
    content: 'Explore different types of accommodation available for international students.',
  },
  {
    title: 'Language Learning Tips for Students',
    author: 'Anna Davis',
    content: 'Learn how to pick up a new language quickly while studying abroad.',
  },
  {
    title: 'Health Insurance for International Students',
    author: 'James Anderson',
    content: 'Understand the importance of health insurance and how to choose the right plan.',
  },
  {
    title: 'Networking Tips for Students Abroad',
    author: 'Laura Thomas',
    content: 'Build a strong network while studying abroad to boost your career prospects.',
  },
  {
    title: 'Top Study Destinations in Europe',
    author: 'Daniel White',
    content: 'Explore the best countries in Europe for international students.',
  },
  {
    title: 'How to Manage Finances While Studying Abroad',
    author: 'Olivia Harris',
    content: 'Learn how to budget and manage your finances effectively.',
  },
  {
    title: 'Student Life in the USA',
    author: 'Ethan Clark',
    content: 'Get insights into the student life and culture in the United States.',
  },
  {
    title: 'Preparing for Your Study Abroad Journey',
    author: 'Isabella Lewis',
    content: 'Find out what you need to do before embarking on your study abroad adventure.',
  },
];

// Map blog titles to their corresponding image files
const blogImages: Record<string, string> = {
  'Top Universities for International Students': '/src/assets/blog image/Top-Universities-for-International-Students.png',
  'How to Apply for Scholarships Abroad': '/src/assets/blog image/How-to-Apply-for-Scholarships-Abroad.png',
  'Visa Guidance for Study Abroad': '/src/assets/blog image/Visa_Guidance_for_Study_Abroad.png',
  'Affordable Study Destinations': '/src/assets/blog image/Affordable_Study_Destinations.png',
  'Part-Time Work Opportunities for Students': '/src/assets/blog image/Part-Time_Work_Opportunities_for_Students.png',
  'Cultural Adaptation Tips for International Students': '/src/assets/blog image/Cultural_Adaptation_Tips_for_International_Students.png',
  'Best Courses for a Global Career': '/src/assets/blog image/Best_Courses_for_a_Global_Career.png',
};

const BlogPage = () => {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              {/* Adjusted image height to match width for a perfect square */}
              <img
                src={blogImages[blog.title] || '/src/assets/blog image/default.png'}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-md mb-4"
                style={{ aspectRatio: '1 / 1' }}
              />
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-4">By {blog.author}</p>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => window.scrollTo(0, 0)}
              >
                Read Full Blog
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;