import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
    const { user, logout } = useAuth();

    const NavItem = ({ page, name, icon }: { page: string, name: string, icon: string }) => (
         <li className={currentPage === page ? 'active' : ''}>
            <button onClick={() => onNavigate(page)}>
                <span className="material-icons">{icon}</span>
                {name}
            </button>
        </li>
    );

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                 <span className="logo-icon">🌍</span>
                 <h1>CarbonCalc</h1>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <NavItem page="welcome" name="Dashboard" icon="dashboard" />
                    <NavItem page="calculator" name="Calculator" icon="calculate" />
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div className="user-profile-summary">
                    <div className="avatar">{user?.name?.charAt(0)}</div>
                    <div className="user-info">
                        <span className="user-name">{user?.name}</span>
                        <span className="user-email">{user?.email}</span>
                    </div>
                </div>
                 <ul>
                    <NavItem page="profile" name="Profile" icon="person" />
                     <li>
                        <button onClick={logout}>
                            <span className="material-icons">logout</span>
                            Logout
                        </button>
                    </li>
                 </ul>
            </div>
        </aside>
    );
};
