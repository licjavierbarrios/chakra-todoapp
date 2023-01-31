import { Box, VStack, Image, Heading, Text, HStack, Button } from "@chakra-ui/react";

function Card() {
	return (
		<Box bg="pink">
			<VStack borderRadius="10px">
				<Box>
					<Box bg="pink" h="700px" w="300px" mt="10px">
						<Box w="100%" h="100px">
							<Image
								sx={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }}
								objectFit="cover"
								src="https://www.infobae.com/new-resizer/2Vu9vcJvSdGBMaiIlvHXExge1zw=/768x512/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/IK3AZZADIJDQFD5S2YJ2Z2CWLY.jpg"
								alt="Image"
							/>
						</Box>

						<Box bg="white" sx={{ borderBottomLeftRadius: "25px", borderBottomRightRadius: "25px" }}>
							<Box h="150px" w="150px" m="auto" mt="30px">
								<Image
									objectFit="cover"
									src="https://static.guiainfantil.com/pictures/galerias/5827-4-dibujos-para-colorear-de-partes-del-cuerpo-humano.jpg"
									alt="Avatar"
									borderRadius="full"
								/>
							</Box>

							<Heading size="md" textAlign="center">
								Morgan Sweeney
							</Heading>
							<Text textAlign="center" color="gray.300">
								Ant Collector
							</Text>
							<HStack justify="center" spacing="40px">
								<Box>
									<Text fontSize="xl" fontWeight="bold" color="blue.400">
										12
									</Text>
									<Text color="gray.300">Followers</Text>
								</Box>
								<Box>
									<Text fontSize="xl" fontWeight="bold" color="blue.400">
										1000
									</Text>
									<Text color="gray.300">Following</Text>
								</Box>
							</HStack>
							<VStack>
								<Button w="80%" borderRadius="25px" colorScheme="yellow">
									Follow
								</Button>
							</VStack>
							<VStack>
								<Text p="30px" textAlign="justify">
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint excepturi magni natus nam esse nemo repudiandae officiis
									recusandaptio corrupti est quis neque nisi natus rem, nobis illum accusamus ad distinctio.
								</Text>
							</VStack>
						</Box>
					</Box>
				</Box>
			</VStack>
		</Box>
	);
}

export default Card;
