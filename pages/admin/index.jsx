import {
	Flex,
} from '@chakra-ui/react';
import Layout from '@/components/admin/Layout'

// import { Province, 	District, Ward } from '@/models/index';

const AdminHome = () => {
	return (
		<Layout bg="#f3f5f9">
			<Flex>
				Hello
			</Flex>
		</Layout>
	)
}

// export const getStaticProps = async () => {
// 	const provinces = await Province.findAll({
// 		include: {
// 			model: District,
// 			include: {
// 				model: Ward,
// 				separate: true
// 			},
// 			separate: true,
// 		}
// 	}, {
// 		raw: true
// 	});
// 	console.log(provinces)
// 	return {
// 		props: {  }
// 	};
// };

export default AdminHome;