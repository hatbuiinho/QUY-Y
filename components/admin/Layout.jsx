import SidebarWithHeader from './SidebarWithHeader'

export default function Layout({ children }) {
	return (
		<SidebarWithHeader>
			{children}
		</SidebarWithHeader>
	)
}