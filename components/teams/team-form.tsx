"use client"
import {EditableTeam, Team} from "@/types/db";
import React, { useState } from "react";
import {Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../custom-ui/button";


export interface TeamFormProps {
    data?: Team
    onSubmit?: (data: EditableTeam) => void;
}

export default function TeamForm({data,onSubmit}:TeamFormProps) {

    const [formData, setFormData] = useState<EditableTeam>({
        team_name: data?.team_name || '',
        description: data?.description || '',
        owner_id: data?.owner_id || '',
        avatar_url: data?.avatar_url || '',
    });

    const handleChange = (field: keyof EditableTeam, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
                <Label htmlFor="team_name">Team Name</Label>
                <Input
                    id="team_name"
                    value={formData.team_name}
                    onChange={(e) => handleChange('team_name', e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={formData.description ?? ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="owner_id">Owner ID</Label>
                <Input
                    id="owner_id"
                    value={formData.owner_id}
                    onChange={(e) => handleChange('owner_id', e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                    id="avatar_url"
                    value={formData.avatar_url ?? ''}
                    onChange={(e) => handleChange('avatar_url', e.target.value)}
                />
            </div>

            <Button type="submit">Save</Button>
        </form>
    );
}