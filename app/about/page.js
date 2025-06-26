export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Tree Mapping</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          Tree Mapping is dedicated to creating a comprehensive database of trees in urban and rural environments. 
          By mapping and monitoring trees, we aim to promote environmental awareness, support conservation efforts, 
          and provide valuable data for urban planning and climate change research.
        </p>
        <p className="text-gray-700">
          Our platform enables citizens, researchers, and organizations to collaborate in documenting tree species, 
          health conditions, and seasonal changes, creating a living record of our natural environment.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="text-gray-700 mb-4">
          Users can add tree locations to our interactive map, including details such as species, health status, 
          and photos. Over time, users can track seasonal changes, document tree health, and organize community 
          events related to tree planting and maintenance.
        </p>
        <p className="text-gray-700">
          The collected data helps scientists and city planners understand urban forest dynamics, biodiversity patterns, 
          and the impacts of climate change on tree populations.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
        <p className="text-gray-700 mb-4">
          Join our growing community of tree enthusiasts! Create an account to start mapping trees in your area, 
          participate in community events, and contribute to environmental conservation efforts.
        </p>
        <p className="text-gray-700">
          Whether you're a casual nature lover, a professional arborist, or a concerned citizen, your contributions 
          help build a more complete picture of our urban and rural forests.
        </p>
      </div>
    </div>
  );
} 