import axios from 'axios';

// Using a mock course data generator for demonstration
// In production, replace with actual course API like Udemy, Coursera, etc.
const generateMockCourses = (query = 'computer science', count = 20) => {
  const courseTopics = {
    'computer science': [
      { title: 'Introduction to Computer Science', instructor: 'Dr. John Smith', category: 'Programming', level: 'Beginner', duration: '8 weeks', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
      { title: 'Data Structures and Algorithms', instructor: 'Prof. Sarah Johnson', category: 'Computer Science', level: 'Intermediate', duration: '12 weeks', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop' },
      { title: 'Web Development Bootcamp', instructor: 'Michael Chen', category: 'Web Development', level: 'Beginner', duration: '16 weeks', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop' },
      { title: 'Machine Learning Fundamentals', instructor: 'Dr. Emily Williams', category: 'AI & ML', level: 'Advanced', duration: '10 weeks', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop' },
      { title: 'Mobile App Development', instructor: 'David Martinez', category: 'Mobile Development', level: 'Intermediate', duration: '14 weeks', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop' },
      { title: 'Cloud Computing with AWS', instructor: 'Jennifer Lee', category: 'Cloud Computing', level: 'Intermediate', duration: '8 weeks', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop' },
      { title: 'Database Design and SQL', instructor: 'Robert Brown', category: 'Database', level: 'Beginner', duration: '6 weeks', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop' },
      { title: 'Cybersecurity Essentials', instructor: 'Dr. Amanda Taylor', category: 'Security', level: 'Intermediate', duration: '10 weeks', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop' },
      { title: 'Python Programming Masterclass', instructor: 'Kevin Anderson', category: 'Programming', level: 'Beginner', duration: '12 weeks', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop' },
      { title: 'Full Stack JavaScript', instructor: 'Lisa Thompson', category: 'Web Development', level: 'Advanced', duration: '20 weeks', image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop' },
      { title: 'React Native Development', instructor: 'Chris Wilson', category: 'Mobile Development', level: 'Intermediate', duration: '10 weeks', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop' },
      { title: 'DevOps Engineering', instructor: 'Dr. Mark Davis', category: 'DevOps', level: 'Advanced', duration: '12 weeks', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop' },
      { title: 'UI/UX Design Principles', instructor: 'Sophie Garcia', category: 'Design', level: 'Beginner', duration: '8 weeks', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop' },
      { title: 'Blockchain Development', instructor: 'Alex Martinez', category: 'Blockchain', level: 'Advanced', duration: '14 weeks', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop' },
      { title: 'Game Development with Unity', instructor: 'James Rodriguez', category: 'Game Development', level: 'Intermediate', duration: '16 weeks', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop' },
      { title: 'Artificial Intelligence Basics', instructor: 'Dr. Maria Lopez', category: 'AI & ML', level: 'Beginner', duration: '10 weeks', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop' },
      { title: 'Software Testing and QA', instructor: 'Patricia White', category: 'Quality Assurance', level: 'Intermediate', duration: '6 weeks', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop' },
      { title: 'Network Security', instructor: 'Daniel Harris', category: 'Security', level: 'Advanced', duration: '12 weeks', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop' },
      { title: 'Java Programming Complete', instructor: 'Richard Clark', category: 'Programming', level: 'Beginner', duration: '14 weeks', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop' },
      { title: 'Docker and Kubernetes', instructor: 'Susan Lewis', category: 'DevOps', level: 'Advanced', duration: '8 weeks', image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop' },
    ],
    'default': [
      { title: 'Introduction to Programming', instructor: 'Dr. John Smith', category: 'Programming', level: 'Beginner', duration: '8 weeks', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop' },
      { title: 'Business Analytics', instructor: 'Prof. Sarah Johnson', category: 'Business', level: 'Intermediate', duration: '10 weeks', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
      { title: 'Digital Marketing Strategy', instructor: 'Michael Chen', category: 'Marketing', level: 'Beginner', duration: '6 weeks', image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400&h=300&fit=crop' },
      { title: 'Project Management Professional', instructor: 'Dr. Emily Williams', category: 'Management', level: 'Intermediate', duration: '12 weeks', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop' },
      { title: 'Data Science Fundamentals', instructor: 'David Martinez', category: 'Data Science', level: 'Intermediate', duration: '14 weeks', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
    ]
  };

  const searchQuery = query.toLowerCase();
  let selectedCourses = courseTopics['computer science'];
  
  if (searchQuery.includes('business') || searchQuery.includes('management')) {
    selectedCourses = courseTopics['default'].filter(c => c.category.includes('Business') || c.category.includes('Management'));
  } else if (searchQuery.includes('marketing')) {
    selectedCourses = courseTopics['default'].filter(c => c.category.includes('Marketing'));
  } else if (searchQuery.includes('data')) {
    selectedCourses = courseTopics['computer science'].filter(c => c.category.includes('Data') || c.title.includes('Data'));
  }

  return selectedCourses.slice(0, count);
};

export const fetchCourses = async (query = 'computer science') => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockCourses = generateMockCourses(query, 20);
    
    // Transform to course format
    const courses = mockCourses.map((course, index) => ({
      key: `course-${index}-${Date.now()}`,
      title: course.title,
      instructor: course.instructor,
      category: course.category,
      level: course.level,
      duration: course.duration,
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      students: Math.floor(1000 + Math.random() * 50000),
      price: Math.floor(29 + Math.random() * 170),
      thumbnail: course.image || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop`,
      description: `Learn ${course.title.toLowerCase()} from industry experts. This comprehensive course covers all essential topics and includes hands-on projects.`,
      lastUpdated: '2024',
    }));
    
    return { success: true, data: courses };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to fetch courses' 
    };
  }
};

export const getCoverImageUrl = (thumbnail) => {
  return thumbnail || null;
};
