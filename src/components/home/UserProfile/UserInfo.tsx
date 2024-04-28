import { UserWithPhoto } from "@/lib/definitions";

interface UserProfileProps {
    session: UserWithPhoto;
}


const UserProfile:  React.FC<UserProfileProps> = ({session}) => {
    return (
        <div>
            <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-black mb-2">
                    {session?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-black font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-black"></i>
                    {session?.email}
                </div>
                <div className="mb-2 text-black mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-black"></i>
                    {session?.rol}
                </div>
                {/* <div className="mb-2 text-black">
                    <i className="fas fa-university mr-2 text-lg text-black"></i>
                    University of Computer Science
                </div> */}
            </div>

            {/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-black">
                        </p>
                        <a href="javascript:void(0);" className="font-normal text-black">
                            Show more
                        </a>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default UserProfile;