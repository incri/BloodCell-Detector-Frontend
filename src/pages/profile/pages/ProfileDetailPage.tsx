import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Heading, Text, SimpleGrid, Image, Card, CardBody, Button, VStack, Spinner, Center } from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';

// Define the type for a single article
interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Define the type for the entire API response
interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

const NewsPage = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual NewsAPI key
    const API_KEY = 'd4d5aab6d6fe49bfbb504799a9ffc8ce';  
    const url = `https://newsapi.org/v2/everything?q=blood+cell+WBC&apiKey=${API_KEY}`;

    axios.get<NewsApiResponse>(url) // Specify the response type
      .then(response => {
        setNews(response.data.articles);  // Set the fetched articles
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(error => {
        console.error('Error fetching the news:', error);
        setLoading(false); // Stop loading in case of an error
      });
  }, []);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <Container maxW="7xl" py={10}>
      {/* Header Section */}
      <Box textAlign="center" mb={12}>
        <Heading as="h1" size="3xl" color="teal.600">
          Latest News on Blood Cells and WBC Health
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Stay updated with the latest breakthroughs in blood cell research, white blood cell (WBC) counts, and other medical advancements.
        </Text>
      </Box>

      {/* News Section */}
      <Box maxHeight="700px" overflowY="auto">

      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
        {news.map((article, index) => (
          <Card key={index} borderRadius="md" boxShadow="md" overflow="hidden">
            <CardBody>
              <Image
                src={article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/300'}
                alt={article.title}
                borderRadius="md"
                objectFit="cover"
                width="100%"
                height="200px"
                mb={4}
              />
              <VStack align="start" spacing={3}>
                <Heading size="md">{article.title}</Heading>
                <Text color="gray.700">{article.description}</Text>
                <Text fontSize="sm" color="gray.500">{new Date(article.publishedAt).toLocaleDateString()}</Text>
                <Button
                  as="a"
                  href={article.url}
                  target="_blank"
                  colorScheme="teal"
                  rightIcon={<FaExternalLinkAlt />}
                >
                  Read More
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>


      </Box>
      
    </Container>
  );
};

export default NewsPage;
