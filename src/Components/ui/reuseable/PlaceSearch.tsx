import { memo, useState } from "react";
import { Select, Spin } from "antd";
import { getPlaceDetails, getPlaceSuggestions } from "../../../lib/getPlaceNameAndCoordinates";

const PlaceSearch = ({ setMapData }: { setMapData: any }) => {
    const [options, setOptions] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value: string) => {
        if (!value) {
            setOptions([]);
            return;
        }

        setLoading(true);

        const results = await getPlaceSuggestions(value);
        setLoading(false);

        setOptions(
            results.map((place: any) => ({
                label: place.name,
                value: place.placeId,
            }))
        );
    };

    const handleSelect = async (placeId: string) => {
        const place = await getPlaceDetails(placeId);

        if (!place) return;

        setMapData({
            latitude: place?.latitude,
            longitude: place?.longitude
        })
    };

    return (
        <div>
            <Select
                size="large"
                showSearch
                allowClear
                onClear={() => {
                    setMapData({
                        latitude: 0,
                        longitude: 0
                    })
                }}
                placeholder="Search a place"
                style={{ width: "100%" }}
                onSearch={handleSearch}
                onSelect={handleSelect}
                filterOption={false}
                notFoundContent={loading ? <Spin size="small" /> : null}
                options={options}
            />
        </div>
    );
};

export default memo(PlaceSearch);
